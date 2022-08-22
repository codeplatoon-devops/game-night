# game-night

## how to merge new features to the main branch

### Loot at what branch you are standing, if it's not main you can change back

    git checkout main

### Fetch the newest code

    git fetch
    git merge
    

### get the issue link in Jira and create a branch

example:
    git checkout -b RBT-6-create-list-of-best-practices

### make your changes

    remember to test the code before pushing, if possible include the result of the tests passing.

### push them to your branch, make sure to add the Jira issue in the commit message

    git add .
    git commit -m "JRA-123 <summary of commit>"
    git push -u origin <branch name>

### send a pull request in github repo
    

    If no reviewer has beeen asigned in Jira, any member can review the code and accept the changes if they are sure it wont cause problems
 


