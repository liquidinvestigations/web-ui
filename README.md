# web-ui

For development:
Get latest version

    npm i
    node toggleProxy.js apiary.mock.url
    npm run start
    
For production
    
    npm i
    npm run build-prod
    
It will output a dist folder that you have to serve. 

Underneath is a list that points out where texts are:
 * src/static/about/about.html - the About page text
 * src/app/config/steps/welcome-step/welcome-step.component.html - the Wizard welcome text
 * src/app/config/steps/final-step/final-step.component.html - the Wizard final text description
  