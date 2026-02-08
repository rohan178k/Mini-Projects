import random

word_list = [
    "abrupt", "absurd", "abyss", "afford", "avenue", "awkward",
    "bamboo", "banjo", "beacon", "building", "blight", "buzzer",
    "cactus", "canopy", "canyon", "caviar", "cobalt", "cyborg",
    "dagger", "dapper", "deluxe", "device", "dismal", "duplex",
    "editor", "effect", "emblem", "energy", "enigma", "exodus",
    "fabric", "falcon", "fathom", "fidget", "filter", "fossil",
    "gadget", "galaxy", "gargle", "gentle", "ghetto", "gizmo",
    "hammer", "harbor", "hazard", "helmet", "hollow", "hybrid",
    "icebox", "island", "impact", "indoor", "injury", "ivory",
    "jacket", "jargon", "jersey", "jigsaw", "jovial", "jungle",
    "karate", "kennel", "kettle", "khaki", "kidney", "knight",
    "ladder", "laptop", "legacy", "lizard", "luxury", "lyric",
    "magnet", "mammal", "matrix", "melody", "memory", "mystic",
    "nebula", "nectar", "nephew", "nimble", "nozzle", "nugget",
    "oblong", "occupy", "octave", "offset", "optics", "oxygen",
    "palace", "pantry", "pebble", "phantom", "picnic", "penguin",
    "quaint", "quartz", "quench", "quiver", "quorum", "quotas",
    "rabbit", "radar", "raffle", "rhythm", "ritual", "robotic",
    "safety", "satire", "scheme", "scroll", "silver", "symbol",
    "tablet", "target", "tattoo", "theory", "thrift", "tyrant",
    "umpire", "unfold", "unique", "upbeat", "upshot", "utmost",
    "vacuum", "valley", "velvet", "vessel", "victim", "volume",
    "walnut", "weapon", "weaver", "widget", "wizard", "wreath",
    "xenons", "xeroxs", "xylene", "xylols", "xystos", "xyster",
    "yachts", "yapped", "yellow", "yields", "yoghur", "youths",
    "zaping", "zenith", "zephyr", "zigzag", "zipped", "zodiac"
]

chosen_word = random.choice(word_list)
chosen_word_length = len(chosen_word)
chosen_word_letters = []
for letter in chosen_word : 
    chosen_word_letters.append(letter)

stages = [
    """
                     ___________
                    |     |     |
                    |     |     |
                    |     O     |
                    |    /|\\    |
                    |    / \\    |
                    |___________|
    """,
    """
                     ___________
                    |     |     |
                    |     |     |
                    |     O     |
                    |    /|\\    |
                    |    /      |
                    |___________|
    """,
    """
                     ___________
                    |     |     |
                    |     |     |
                    |     O     |
                    |    /|\\    |
                    |           |
                    |___________|
    """,
    """
                     ___________
                    |     |     |
                    |     |     |
                    |     O     |
                    |    /|     |
                    |           |
                    |___________|
    """,
    """
                     ___________
                    |     |     |
                    |     |     |
                    |     O     |
                    |     |     |
                    |           |
                    |___________|
    """,
    """
                     ___________
                    |     |     |
                    |     |     |
                    |     O     |
                    |           |
                    |           |
                    |___________|
    """,
    """
                     ___________
                    |     |     |
                    |     |     |
                    |           |
                    |           |
                    |           |
                    |___________|
    """
]

# Function to print stages
def print_stages() :
    print(f"{stages[lives]}")
    print("")


lives = 6    # At the start of the game
# Function to print lives
def print_lives() :
    print("")
    print(f"                      Lives: {lives}")
    print("")

# Function to display the word
display = []

for letter in chosen_word :
    display.append("_")

def print_display() :
    print("\t\tProgress:  ", end="")
    for x in display :
        print(f"{x} ", end="")
    print("")

# Step 1 : Start the game

print("\n")
print("************ WELCOME TO THE HANGMAN GAME ************")
print("********** Guess the letter before you die **********")
print_lives()
print_display()
print_stages()

game_over = False
guessed_letters = []

while game_over != True :

    # Step 2 : Take guess input from user
    user_guess = input("\t\tEnter a letter: ").lower()
    print("")

    # Step 3 : Check if the guess is repeated
    if user_guess in guessed_letters :
        print("\t\tYou already guessed this letter...")
    # If the user guesses new word
    else :

        # Step 4 : If the guess is correct
        if user_guess in chosen_word_letters :
            print("\t\tYour guess was CORRECT!")
            guessed_letters.append(user_guess)
            # Update the position in display
            for pos in range(chosen_word_length) :
                if user_guess == chosen_word_letters[pos] :
                    display[pos] = user_guess

        # Step 5 : If the guess is wrong
        else : 
            print("\t\tYour guess was WRONG!")
            guessed_letters.append(user_guess)
            lives -= 1

    # Step 6 : Check if game is over
    if (lives < 1) or ("_" not in display) :
        game_over = True
    
    # Printing
    print_lives()
    print_display()
    print_stages()
    if game_over == True :
        if lives < 1 :
            print("\t\t     GAME OVER!")
            print(f"\t\tThe word was: {chosen_word}")
        else :
            print("\t\tCONGRATULATIONS! YOU WON!")
            print(f"\t\tThe word was: {chosen_word}")
        print("")

    print("*******************************************************")
