# web-ui

The Liquid investigations Admin panel was built using Angular framework.
For more details regarding this framework please visit the [official website](https://angular.io/). 

For the production build and for development NodeJs is required.


#### For production:

    git clone https://github.com/liquidinvestigations/web-ui.git
    cd web-ui
    npm i
    npm run build-prod
    
The last command will output a dist folder that contains all the app assets.

#### For development:

* Using a mock server

        git clone https://github.com/liquidinvestigations/web-ui.git
        cd web-ui
        npm i
        node toggleProxy.js apiary.mock.url
        npm run start
        # outputs the local address where the app is being served
    
* Working with the LI VM

        git clone https://github.com/liquidinvestigations/web-ui.git
        cd web-ui
        npm i
        npm build-watch
        # outputs a dist folder and recompiles the app whenever changes are made to the code

Dev details regarding several app modules:
* [Admin Module](https://github.com/liquidinvestigations/web-ui/tree/master/src/app/admin)
* [Config Module](https://github.com/liquidinvestigations/web-ui/tree/master/src/app/config)
* [Panel Layout](https://github.com/liquidinvestigations/web-ui/tree/master/src/app/panel-layout)
* [Static Views](https://github.com/liquidinvestigations/web-ui/tree/master/src/app/static)

Underneath is a list that points out where texts are:
 * [About View](src/app/static/about/about.component.html) - contains the About view text
 * [Config - Welcome Step](src/app/config/steps/welcome-step/welcome-step.component.html) - the Wizard welcome text
 * [Config - Final Step](src/app/config/steps/final-step/final-step.component.html) - the Wizard final text description
 
 
  