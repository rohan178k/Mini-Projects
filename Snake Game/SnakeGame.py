import pygame # pip install pygame
import random
from datetime import datetime
from pymongo import MongoClient # pip install pymongo

# 1. Configuration and Constants
WIDTH = 600
HEIGHT = 400
BLOCK_SIZE = 20
SPEED = 10

# Colors
WHITE = (255, 255, 255)
RED = (213, 50, 80)
GREEN = (0, 255, 0)
BLACK = (0, 0, 0)

try:

    # 2. Database Connection
    uri = "mongodb://localhost:27017/"
    client = MongoClient(uri)

    client.admin.command("ping")
    print("Database Connected successfully")

    # Creating database and collection
    database = client["SnakeGameDB"]
    collection = database["Scores"]

    def game_loop() :
        game_over = False
        # Starting position
        x = WIDTH // 2
        y = HEIGHT // 2
        dx = 0
        dy = 0

        snake_body = []
        length_of_snake = 1

        # Randomly place food
        food_x = round(random.randrange(0, WIDTH - BLOCK_SIZE) / BLOCK_SIZE) * BLOCK_SIZE
        food_y = round(random.randrange(0, HEIGHT - BLOCK_SIZE) / BLOCK_SIZE) * BLOCK_SIZE

        while not game_over:
            for event in pygame.event.get():
                if event.type == pygame.QUIT:
                    game_over = True
                if event.type == pygame.KEYDOWN: 
                    # Prevent snake from reversing directly into itself
                    if event.key == pygame.K_LEFT and dx == 0:
                        dx, dy = -BLOCK_SIZE, 0
                    elif event.key == pygame.K_RIGHT and dx == 0:
                        dx, dy = BLOCK_SIZE, 0
                    elif event.key == pygame.K_UP and dy == 0:
                        dx,dy = 0, -BLOCK_SIZE
                    elif event.key == pygame.K_DOWN and dy == 0:
                        dx,dy = 0, BLOCK_SIZE

            # Check for wall collisions
            if x >= WIDTH or x < 0 or y >= HEIGHT or y < 0 :
                game_over = True
            
            x += dx
            y += dy
            screen.fill(BLACK)

            # Draw Food
            pygame.draw.rect(screen, RED, [food_x, food_y, BLOCK_SIZE, BLOCK_SIZE])

            # Manage Snake body logic
            snake_head = [x, y]
            snake_body.append(snake_head)

            # If we didn't eat food, remove the oldest part of the tail
            if len(snake_body) > length_of_snake: 
                del snake_body[0]

            # Check for self collision
            for segment in snake_body[:-1]:
                if segment == snake_head:
                    game_over = True

            # Draw Snake
            for segment in snake_body:
                pygame.draw.rect(screen, GREEN, [segment[0], segment[1], BLOCK_SIZE, BLOCK_SIZE])

            pygame.display.update()

            # Check if Food is Eaten
            if x == food_x and y == food_y:
                food_x = round(random.randrange(0, WIDTH - BLOCK_SIZE) / BLOCK_SIZE) * BLOCK_SIZE
                food_y = round(random.randrange(0, HEIGHT - BLOCK_SIZE) / BLOCK_SIZE) * BLOCK_SIZE
                length_of_snake += 1

            clock.tick(SPEED)

        pygame.quit()
        print("")
        print(f"Game Over!")
        score = length_of_snake-1
        curr_time = datetime.now().strftime("%Y-%m-%d %H:%M:%S")

        # Save score to database
        score_data = {"player_name": player_name, "score": score, "difficulty": difficulty, "date_time": curr_time}
        collection.insert_one(score_data)

        return(score)

    # 3. Main Game Loop
    print("-----------------------------------------------------------------------")
    print("")
    print("Do you want to play?")
    option = input("Enter your option (y/n) : ").lower()
    score = 0

    while option == "y" :

        # Getting player name and difficulty level
        print("")
        player_name = input("Enter your name : ")
        difficulty = input("Difficulty Levels : [ easy - 1 / medium - 2 / hard - 3 ] \nChoose the Level : ").lower()
        if difficulty == "easy" or difficulty == "1":
            SPEED = 5
            difficulty = "easy"
            print("Starting game with easy difficulty...")
        elif difficulty == "medium" or difficulty == "2":
            SPEED = 10
            difficulty = "medium"
            print("Starting game with medium difficulty...")
        elif difficulty == "hard" or difficulty == "3":
            SPEED = 15
            difficulty = "hard"
            print("Starting game with hard difficulty...")
        else:
            print("Invalid option, defaulting to medium difficulty")
            print("Starting game with medium difficulty...")
            SPEED = 10
            difficulty = "medium"

        pygame.init()
        screen = pygame.display.set_mode((WIDTH, HEIGHT))
        pygame.display.set_caption("Python Snake Game")
        clock = pygame.time.Clock()

        if __name__ == "__main__":
            score = game_loop()           

        print(f"Player : {player_name} \nScore: {score}")
        
        print("-----------------------------------------------------------------------")
        print("")
        print("Do you want to play more?")
        option = input("Enter your option (y/n) : ").lower()

    client.close()
    print("\nConnection closed successfully")

except Exception as e:
    raise Exception(

        "\nThe following error occurred: ", e)
