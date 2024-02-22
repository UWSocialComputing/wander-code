# wander-code

## `back-end/`
1. Run back-end from ```back-end/src/maven/``` using command ```mvn spring-boot:run```
2. Open backend on ```http://localhost:8080```

## `front-end/`
1. `npm install`
2. `npm run start`
3. Open frontend on `http://localhost:8000`

### Components:
- **App**: Renders appropriate major component page, navigation bar
    - Nav Bar: logo (home to map) and 'profile'/'saved'
    - **Map**: uses map library, intially centered around SocComp class, can move around map, zoom
        - **Filters**: UI selectors for types and start/end date (UTC), take current center of map as "location"
        - **Pin**: uses pin component of Map library, one rendered per event with corresponding event custom type image
    - **Flyer**:
        - Next Arrow
        - Back Arrow
        - More Info: button?
        - Share/Calendar: accesses GCal endpoint
        - Save
    - Profile: Generic profile (optional)
        - Saved Flyers: View of mini flyers sorted by closest to furthest away

## Setup
1. Install `mvn` with command `brew install mvn` (MacOS)