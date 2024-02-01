# A utility to add accounts to JSON file securely
# This does not compile to a standalone executable on a mobile device
# This is a developer tool

import json
import sys

file_path = "login.json"

def read_json_file():
    with open(file_path, 'r') as file:
        data = json.load(file)
    return data

def write_json_file(data):
    with open(file_path, 'w') as file:
        json.dump(data, file, indent=2)

def add_entry(data, new_entry):
    data.append(new_entry)

def search_and_update_entry(data, key, value, updated_data):
    for entry in data:
        if entry.get(key) == value:
            if updated_data is not None:
                entry.update(updated_data)
            else:
                data.remove(entry)  # Remove entry if updated_data is None
            return True  # Entry found and updated or deleted
    return False  # Entry not found

# Read existing data
existing_data = read_json_file()

def main():
    while True:
        user_input = int(input("Enter 1 to add a new entry\nEnter 2 to update an existing entry\nEnter 3 to delete an existing entry\nEnter 4 to exit\n"))
        if user_input == 4:
            break
        process_selection(user_input)
        write_json_file(existing_data)

def process_selection(selection):
    if selection == 1:
        name = input("Enter name: ")
        osis = input("Enter OSIS: ")
        username = input("Enter username: ")
        password = input("Enter password: ")

        new_entry = {'name': name, 'osis': osis, 'username': username, 'password': password}
        add_entry(existing_data, new_entry)
        print("Entry added successfully")

    elif selection == 2:
        name = input("Enter name: ")
        username = input("Enter new username: ")
        password = input("Enter new password: ")

        updated_data = {'username': username, 'password': password}
        if search_and_update_entry(existing_data, 'name', name, updated_data):
            print("Entry updated successfully")
        else:
            print("Entry not found")

    elif selection == 3:
        name = input("Enter name: ")
        if search_and_update_entry(existing_data, 'name', name, None):
            print("Entry deleted successfully")
        else:
            print("Entry not found")

if __name__ == "__main__":
    main()