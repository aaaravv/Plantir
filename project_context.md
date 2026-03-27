# 🌿 Plantir – Project Context

## 📌 Overview
Plantir is an intelligent plant care assistant designed to help users keep their plants alive and thriving. It provides personalized care guidance based on a user’s lifestyle, environment, and plant type, removing guesswork and preventing common mistakes like overwatering or neglect.

The goal is to transform plant care into a simple, reliable routine and encourage sustainable habits through consistent engagement.

---

## 🎯 Target Users
Plantir is designed for:
- Urban apartment residents
- First-time or inexperienced plant owners
- Busy individuals who struggle with consistent plant care

---

## 🧠 Core Idea
Plant care is often confusing and inconsistent due to:
- Different plant needs
- Lack of knowledge
- Irregular schedules

Plantir solves this by adapting to the user and providing:
- Personalized recommendations
- Timely reminders
- Clear, simple guidance

---

## 🌱 Key Features (MVP Scope)

### 1. Plant Management
- Add a plant (manual selection or simple input)
- Store plant type and basic care info

### 2. Care Recommendations
- Watering guidance based on plant type
- Adjustments based on user behavior/schedule (simplified logic)

### 3. Reminders
- Notify users when care actions are needed
- Prevent overwatering and neglect

### 4. Plant Status / Dashboard
- Show plant health or status
- Display upcoming care actions

---

## 🔄 Behavior Change Goal
Plantir is not just an informational tool—it is designed to change behavior.

It encourages:
- Consistency in plant care
- Awareness of plant needs
- Sustainable habits over time

This is achieved through:
- Reminders
- Simple routines
- Clear feedback (e.g., plant status)

---

## 🎨 Branding & Design System

### Slogan
- `Find Your Plants. Love Your Plants.`
- Can be used in headers, hero copy, or supporting brand messaging

### Colors
- Background: `#FDF3D0` (Soft Sand)
- Primary: `#2F5D2F` (Deep Moss Green)
- Secondary: `#6E8B5C` (Muted Olive)
- Accent: `#AFC8A4` (Light Sage)

### Typography
- **Yeseva One**
  - Use: Titles only
  - Personality: Elegant, expressive, memorable

- **Inter**
  - Use: Body text, subheadings, UI labels
  - Personality: Clean, readable, modern, functional

### Design Principles
- Minimal and breathable layout
- Avoid clutter
- Maintain strong visual hierarchy
- Use Yeseva sparingly for contrast

---

## 🧱 Frontend Structure (React)

Project structure:
```
client/
  src/
    components/
    pages/
    hooks/
    assets/
    App.jsx
    main.jsx
```

Suggested components:
- `PlantCard.jsx`
- `Dashboard.jsx`
- `AddPlantForm.jsx`
- `Navbar.jsx`

---

## 🤝 Team Workflow

- Always pull before starting work:
  ```
  git pull
  ```

- Commit frequently:
  ```
  git add .
  git commit -m "describe change"
  git push
  ```

- Avoid editing the same files simultaneously when possible

---

## 🚀 Project Goal (Hackathon Framing)

Plantir is positioned as:
> A tool that helps users build sustainable habits through plant care

Key impact:
- Reduces plant death
- Encourages consistency
- Makes sustainability accessible

---

## 📈 Future Ideas (Optional / Stretch)

- Plant identification via image
- Environmental adaptation (light, location)
- Gamification (streaks, plant health score)
- Community or sharing features

---

## ⚠️ Constraints

- Keep implementation simple (no complex AI required)
- Focus on clear, working features over ambitious scope
- Prioritize usability and clarity

---

## 🧭 Guiding Principle

Build something that is:
- Simple to understand
- Easy to use
- Clearly valuable within a short demo

Avoid overengineering.
