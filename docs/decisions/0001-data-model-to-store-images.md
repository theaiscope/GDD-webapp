# Data model to store images

* Status: accepted
* Date: 2022-06-16

Technical Story: Define sample data structure | https://trello.com/c/MeHPITHq/35-define-sample-data-structure

## Context and Problem Statement

We need to define a data model for the sample documents to manage the labelling of the images (save, invalid, skip).

To be able to load one image per logged in labeller we need to have the following data per image:

* Date and time when the image has been added by the mobile app
* List of labellers that has already treated that image, including the one that uploads the image through the mobile app
* We need to check if the treatment of the image has been completed. We say the image has been completed when:

    * It's been set as invalid 3 times
    * It's been saved 4 times 

## Considered Options

* Update the current samples collection to store all the info we need related to the images. 
* Add a new images collection where we store just the information that we need per image. 

## Decision Outcome

Chosen option: "[option 2]", because we need to take into account the times we are going to need to read and write the information from the database. So it's better to duplicate some of the fields that needs to read a collection and the children of that collection several times.   

## Pros and Cons of the Options

### Option 1

All the images info is stored under samples collection. 

* Good, because the mobile app would provide all the info
* Good, because we don't need to create any firebase function to add our own information, which has its own cost
* Bad, because the mobile app should not take care of generating info that only it's needed in the web app
* Bad, because we need to load the whole sample with all the images even when some of the images have been already completed.  

### Option 2

Every time a new sample is added from the mobile app, a firebase function is trigered. This function will go through every sample image and will create a new image document with the required data by the web app. 

* Good, because web app works independent on the mobile app.
* Good, because web app has all the info that is required to treat the images
* Good, because we save performance in terms of reading data
* Bad, because a firebase function has its own cost. 
* Bad, because there will some duplicated data, like the createdOn date.
