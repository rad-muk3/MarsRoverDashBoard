# MarsRover Dashboard App

## Description
This project is a MarsRover Dashboard that consumes the NASA API. Your dashboard will allow the user to select which rover's information they want to view.

The DashBoard uses a NavBar UI that lets the user to select the 3 most latest Mars
Rovers as Menu Items. (Curiosity, Spirit and Opportunity).The selected Rover , then
displays the Rover Info with their photos (got from the backend API) as a grid images
along with the launch date, landing date, name and status of that rover. The user will be
able to switch to different Rover Menu items and also go back to Home Page.

## Instructions befor running the App
It is built with Node and Express
It uses yarn package - so run yarn install for the dependencies
It uses the NASA API Key - Key can be obtained from  https://api.nasa.gov/.
Create a .env file and place your API Key as follows:
API_KEY = {}

## Run the App  
yarn start

Type http://localhost:3000 to run the app on your Browser.

You will see a Home Page with a Welcome Screen and Rover Menu items
for the user to select.
Select a Rover from the NavBar and see their live images from the API along with their data.
