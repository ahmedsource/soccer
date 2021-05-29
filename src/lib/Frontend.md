# StatsBomb Frontend Match Collection App:

Your task is to design and develop the front-end experience for an app that
allows the user to watch a match and log in the events that are happening in
the match while watching, using Mouse and/or keyboard shortcuts.

There are two events that the user can enter; Passes & Shots.
Each event has required fields that have to be filled.


## 1. Pass:

Field 1: **Type**:
Could only be one of the following:
  - Open-Play
  - Kick-off
  - Throw-In

Field 2: **Height**:
Could only be one of the following:
  - Ground
  - Low
  - High

Field 3: **Body Part**:
Could only be one of the following:
  - Head
  - Right Foot
  - Left Foot

Field 4: **Extras**
Could be one or more of the following:
  - Aerial-won
  - Backheel


## 2. Shot:

Field 1: **Type**:
Could only be one of the following:
  - Open-Play
  - Free-Kick
  - Penalty
  - Corner

Field 2: **Body Part**:
Could only be one of the following:
  - Head
  - Right Foot
  - Left Foot

Field 4: **Extras**:
Could be one or more of the following:
  - Aerial-won
  - Deflected
  - First-time
  - Redirect.


## Acceptance Criteria

- Following the `eventSpec.js` rules, validation, shortcuts.
- The application starts with listing all events, types.
- The user can click on any event to log in the event.
- The user can use keyboard shortcut to any event to log in the event.

- The user should follow entry validation rules:
  - Passes of Type: Throw-in cannot be of height: Ground
  - Passes of Type: Throw-in cannot have the field Body-Part.
  - Extra: Aerial-won is only available for Body-Part: Head
  - Extra: Backheel is only available for Body-Part: Right Foot or Left Foot
  - Shots of Body-Part: Head are only available for Type: Open-Play

- The user should follow keyboard shortcuts:
 - [E] for a pass with pre-filled Height: Low
 - [W] for a pass with pre-filled Height: Ground and Type: Open-Play
 - [S] for a shot.


## Expectations

- You can use any javascript framework you want for this task (using reactjs is a plus);
- Unit testing (using jestjs is a plus);

We are looking for **Readability, Good Architectural, Performance decisions, Modularity, and unit tested code.**


## Company stack:

**Paradigms**:
  - Functional programming
  - Reactive programming

**Languages & Tools**:
  - Javascript/NodeJS;
  - Clojure;
  - Python 3;
  - React;
  - Redux;
  - Reactive Extensions aka RxJS;
  - Kafka (connect, streams, KSQL);
