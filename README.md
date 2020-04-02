# express_bolierplate
## Simple express scripts to begin a new application (with bonus integration with react)
### integration is implemented via submodules [react_boilerplate](https://github.com/mvcorrea/react_boilerplate)
### usage: 
    git clone --recurse-submodules https://github.com/mvcorrea/express_bolierplate.git
### cloning a repo with a submodule (all steps)
    git clone https://github.com/mvcorrea/express_bolierplate.git sample && cd sample && yarn install
    git submodule add https://github.com/mvcorrea/react_boilerplate.git client && cd client && yarn install
    yarn build && cd .. && yarn start
### commiting changes in both repos
    --- to be done
### 
