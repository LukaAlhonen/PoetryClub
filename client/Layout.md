# PoemHub (working title) Layout

## Global page Layout

### Header
 - Row containing (from left to right):
   - Site logo and name (If site width too small the simply logo)
   - Search bar, if current page is anything but user profile then normal Search
      - If current page is user profile the search will automatically fill in string "from:@username ", so that search will only include poems from currently viewed user (this can be removed to search "globally")
      - Search results displayed in little "drop-down" thing, if user preses enter then go to search page
    - Username and profile picture, if logged in, else log in/register buttons
   - If window width too small then show drop-down menu icon
     - Contains log in, register or "profile" with user icon and search

### Page content

#### Home page /
- Display poems from latest to oldest
  - can later add filtering option
- Use pagination to fetch 6 or 8 poems per page
- Each poem card has poem title on top and "by author" below. Below is what of the poem fits in the card, with opaque filter of the bottom row, indicating that the poem continues
  - User can click on poem text itself to open the poem page and read full poem
  - Author name is link to user profile
  - Poem title is also link to the full poem
- Could also make "infinite scroll" with three or four poems on each row and fetch four or three more rows when user reaches bottom
  - Will have to look into how to handle caching, if user scrolls down, when should older poems be removed from cache, if at all?

#### User profile /profile/:userId
- Same layout for displaying poems as on home page, except above poems container is the text "Poems by author" and user icon after
- Searching for poems using "from:@author " will display user profile with poems filtered using search string

#### Poem /poem/:poemId
- Essentially same as on home page, but show full poem and have title and author name in larger font?
- Number of views on bottom
- Could introduce comments as well, should be simple enough
- Probably gonna have the poem text in some shooth itallic with a nice cool font
- Title in all uppercase with same font as poem text
- username and all other text could use the jetbrains font since I like it a lot

#### Search /search
- Can search for poems, users using author name, #tags, poem title or poem contents
- On search page should be categories, where user can select either authors, poems, #tags
- By default fitler by poems first then authors, for poems use latest always

#### Write new poem /compose
- Form for filling out title at top
- text box for writing the poem itself

#### Login /login
- Form for entering username/password

#### Sign up /register
- Form for entering username, password, verify password and email
  - username and password must be unique

### Footer
- Created by Luka Alhonen
- Github, LinkedIn, and portfolio website links and icons
