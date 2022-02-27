## Muse Docs
<p align="center">
  <img src = "https://user-images.githubusercontent.com/53687927/155859074-3f9c6eda-9a02-482d-8325-afc9fbcaf638.png"/>
</p>

## A Brief Introduction
Have you ever hummed a beat while writing down your thoughts ? Are you an avid writer who just loves to pen down those beautiful thoughts crossing your mind while sipping coffee while watching the sunset from your balcony. Muse Docs is the place for you, a platform for users to pen down their thoughts, feelings, to-do lists or just some gibberish and have a few soothing chords aligned with each keypress based on the sentiment score of what you pen down. Every piece of writing is accompanied by a unique melody generated based on the sentiment of the content. The melodies are interpolated from two sets of music notes using a variational auto encoder (MusicVAE). The platform also presents few additional features which have been mentioned below.

## Features Of Muse Docs :
![image](https://user-images.githubusercontent.com/53687927/155858902-d9e63dad-7cc2-4214-b160-ea53b6cc594a.png)

## Tech Stack
![image](https://user-images.githubusercontent.com/53687927/155858925-8f4413d5-a3e4-4c57-8b32-532615e67b54.png)

## Application Overview
![Muse Docs Architecture](https://i.ibb.co/5T7Vp5z/Muse-Docs-Architecture.jpg)

## Installation (on Local Host)
- Run `yarn install`
- Run `yarn run dev`
- Steps to Add Your Own Melodies (Optional)
  - Convert your `.mp3` to MIDI Files
  - Use `convMIDI.tsx` to generate INoteSequences
  - Copy those INoteSequences into `genMelo.tsx`
  - Generate Melodies & Paste those into `melodies.tsx`
 
## Demo
<a href="https://www.loom.com/share/8a0f0f7007234cc8812086ca7e406fb7">
    <p align = "center" >Muse Docs Demo - Watch Video</p>
  <p align="center">
    <img style="max-width:300px;" src="https://cdn.loom.com/sessions/thumbnails/8a0f0f7007234cc8812086ca7e406fb7-with-play.gif">
  </p>
  </a>


## Meet the Team
Made with :heart: by Team <b>MintMoney</b>  for [Hackverse 3.0](https://hackverse.nitk.ac.in/)
- [Jai Khandelwal](https://github.com/JaiKhandelwal)
- [Nikhil Sahu](https://github.com/nikhilsahu9100)
- [Dwaipayan Munshi](https://github.com/dwaipayan05)

## Resources
- [Notion ThinkPad](https://catnip-sole-709.notion.site/HackVerse-Project-22-89ffee4f843d4e7e8781b1db3c40ab7a) : Design Document with Tracking of Tasks for Hackverse'22
- [Architecture](https://lucid.app/lucidchart/07517a80-b89f-458a-b9e0-eb9a9d57eb71/edit?invitationId=inv_179d8b2d-5971-414a-a51f-5b8ca566b567) : Lucid Chart Diagram of the Build
- [Demo Video](https://www.loom.com/share/8a0f0f7007234cc8812086ca7e406fb7) : A Loom Video Recording of Muse-Docs
- [Audio Samples](https://drive.google.com/drive/folders/177NaXD2w6evbb-Fil82aRwX-8pjw2GGr?usp=sharing) : Audio Notes Used for Melody Generation using VAEs
- [Ambient Sound](https://www.youtube.com/watch?v=lVBhM9PFZXE&ab_channel=DarlingJadore) : Youtube Source for the Ambient Sound Used




