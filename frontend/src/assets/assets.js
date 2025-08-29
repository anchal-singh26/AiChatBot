import logo from "./logochatbot.jpg";

import search_icon from "./search_icon.svg";
import user_icon from "./user_icon.svg";
import theme_icon from "./theme_icon.svg";
import send_icon from "./send_icon.svg";
import stop_icon from "./stop_icon.svg";
import menu_icon from "./menu_icon.svg";
import close_icon from "./close_icon.svg";
import bin_icon from "./bin_icon.svg";

import diamond_icon from "./diamond_icon.svg";
import gallery_icon from "./gallery_icon.svg";


import profile_icon from "./user_icon.svg"; 
import sun_icon from "./theme_icon.svg"; 
import moon_icon from "./theme_icon.svg";
import ai_image1 from "./ai_image1.jpg";
import ai_image2 from "./ai_image2.jpg";
import ai_image3 from "./ai_image3.jpg";
import ai_image4 from "./ai_image4.jpg";
import ai_image5 from "./ai_image5.jpg";
import ai_image6 from "./ai_image6.jpg";
import ai_image7 from "./ai_image7.jpg";
import ai_image8 from "./ai_image8.jpg";

import ai_image10 from "./ai_image10.jpg";
import ai_image11 from "./ai_image11.jpg";
import ai_image12 from "./ai_image12.jpg";


export const dummyUserData = [
  { _id: "user001", name: "Anchal Singh", email: "anchal@example.com", password: "hashedpassword123", credits: 500 },
  { _id: "user002", name: "John Doe", email: "john@example.com", password: "hashedpassword456", credits: 200 },
  { _id: "user003", name: "Jane Smith", email: "jane@example.com", password: "hashedpassword789", credits: 1000 },
];


export const dummyPlans = [
  { _id: "starter", name: "Starter", price: 5, credits: 50, features: ["50 text generations","20 image generations","Email support"] },
  { _id: "gold", name: "Gold", price: 15, credits: 300, features: ["300 text generations","100 image generations","Priority support","Faster response time"] },
  { _id: "enterprise", name: "Enterprise", price: 50, credits: 2000, features: ["2000 text generations","1000 image generations","24/7 support","Dedicated account manager"] },
];


export const dummyChats = [
  {
    _id: "chat001",
    userId: "user001",
    userName: "Anchal Singh",
    name: "First Conversation",
    messages: [
      { isImage: false, role: "user", content: "Hello, how are you?", timestamp: Date.now() },
      { isImage: false, role: "assistant", content: "I'm doing great! How can I help you today?", timestamp: Date.now() },
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    _id: "chat002",
    userId: "user002",
    userName: "John Doe",
    name: "Image Prompt",
    messages: [
      { isImage: false, role: "user", content: "Hello", timestamp: Date.now() },
      { isImage: true, role: "assistant", content: ai_image2, timestamp: Date.now() },
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
    {
    _id: "chat003",
    userId: "user003",
    userName: "Jane Smith",
    name: "Coding Help",
    messages: [
      { isImage: false, role: "user", content: "Can you explain closures in JavaScript?", timestamp: Date.now() },
      { isImage: false, role: "assistant", content: "Sure! A closure is a function that remembers the variables from its scope, even after that scope has closed.", timestamp: Date.now() },
      { isImage: false, role: "user", content: "Got it, thanks!", timestamp: Date.now() },
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    _id: Date.now().toString(), // unique id
    userId: "gs123456789",
    userName: "GreatStack",
    name: "New Chat",
    messages: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
];


export const dummyPublishedImages = [
  { _id: "img001", userId: "user001", url: ai_image5 },
  { _id: "img002", userId: "user002", url: ai_image8 },
  { _id: "img003", userId: "user003", url: ai_image11 },
];


export const assets = {
  logo,
  search_icon,
  user_icon,
  theme_icon,
  send_icon,
  stop_icon,
  menu_icon,
  close_icon,
  bin_icon,
  diamond_icon,
  gallery_icon,
  profile_icon,
  sun_icon,
  moon_icon,
  ai_image1,
  ai_image2,
  ai_image3,
  ai_image4,
  ai_image5,
  ai_image6,
  ai_image7,
  ai_image8,
  ai_image10,
  ai_image11,
  ai_image12,
};
