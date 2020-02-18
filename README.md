# Unloop

## Technologies
* Ruby 2.5.6
* Rails 6.0.0
* Postgresql

## Installation
### Local Development
1. Clone the repo
```bash
git clone https://github.com/calblueprint/unloop.git
cd unloop
```
2. Install dependencies
```bash
bundle install
yarn install
```
3. Setup database
```bash
rails db:setup
# This runs db:create, db:schema:load, and db:seed
```

## Secret Credentials
If your master.key has been compromised, you might want to regenerate it.

No key regeneration feature at the moment. 
We have to do it manually.

1. Copy content of original credentials `rails credentials:show` somewhere temporarily.
2. Remove `config/master.key` and `config/credentials.yml.enc`
3. Run `EDITOR=vim rails credentials:edit` in the terminal: This command will create a new `master.key` and `credentials.yml.enc` if they do not exist.
4. Paste the original credentials you copied (step 1) in the new credentials file (and save + quit vim)
5. Add and Commit the file `config/credentials.yml.enc`

**Important**
- Make sure `config/master.key` is listed in `.gitignore` and NOT tracked by git.
- The command `EDITOR=vim rails credentials:edit` might not work if you require credential value in some file (`initializers` or `database.yml`).
I had the problem with `devise.rb`. I just uncommented the line `secret_key = ...` just the time to run the command to regenerate the credentials file, and then commented the line out again.
- If you want to use Sublime to edit the credentials, you can replace the command `EDITOR=vim rails credentials:edit` by `EDITOR="/Applications/Sublime\ Text.app/Contents/SharedSupport/bin/subl -w" rails credentials:edit`

source: https://gist.github.com/db0sch/19c321cbc727917bc0e12849a7565af9

## Create React Components
### Generate Components
Functional components are components that are made of a function. You need to use hooks in order to use state or lifecycle methods. Most frequently used for components that are stateless but not always. Class components are components that use a class structure. This has been the standard format for React components.
```bash
yarn generate
```
You can also attach `functional` or `class` after generate to quickly specify which component to generate.
1. Do you want to wrap your component in React.memo?
  * This adds memoization to the component. A rule of thumb to think about whether or not your component needs `memo` is if it
    1. Renders the same thing given the same props
    2. Renders often
    3. Re-renders with the same props
    4. Medium to big size
2. Do you want headers? (Only for containers)
  * This changes the title tag and the meta tag for this page.
3. Do you want styles?
  * This uses `withStyles` higher order component to add styles from `styles.js` to override Material UI default styles. Use `classes` in `className` to assign properties.
4. Do you want to load resources asynchronously?
  * This adds React lazy and Suspense before importing. In order to use this, you need to import the Loadable file rather than the index file. This only works with importing on an existing React component, and doesn't work in Rails.
### After Generating
If your component is not a root for a page or shared component, move your component to the folder that matches the page or shared component that it will live under.
