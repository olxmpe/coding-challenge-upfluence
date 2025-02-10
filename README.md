# Social Post Visualization

#### Description

This project is a front-end application designed to visualize social media posts in a heatmap-like structure, based on three key dimensions:

- Day of the week: Represents the day the post was created.
- Hour of the day: Represents the hour at which the post was created.
- Number of posts: The total number of posts that match the above dimensions.

The application consumes a real-time stream of social posts via Server-Sent Events (SSE) from the publicly available Upfluence API, and visualizes this data using a heatmap style grid.

The application is deployed on https://olxmpe.github.io/coding-challenge-upfluence/

### Features

- Real-time data updates
- Interactive filters: Allows users to select and deselect filters based on post types (e.g. Instagram, Tweet, etc.)
- Heatmap: Displays posts as a heatmap, color-coded according to the number of posts. The more posts, the more intense the color.
- Streaming Control: Allows users to start, pause, and reset the data stream.
- Automatic generation of filters based on the types of posts sent by the stream

### Technical Choices

#### Architecture

The application follows a clear separation of concerns with components, services and composables :

Vue 3: I used Vue 3 with the composition API, which is the technology I'm most familiar with, for the sake of maintainability and greater modularity in component construction.

SSE for real-time data: The application uses events sent by the server (SSE) to consume data from the Upfluence API, with the information arriving in real time, with no refresh latency.

HeatMap component: A custom, in-house HeatMap component is used to visualize social messages in a grid.

#### Compromises and decisions

Punchcard vs. Heatmap : After a quick POC of Chart.js, I realized that I'd never get a clean rendering on mobile with a punchcard, and that I was wasting more time tinkering with a chart to make it look like a punchcard than coding a heatmap by hand (after all, it's just a grid with colored backgrounds). I chose a heat map rather than a perforated card for simplicity's sake, as the aim of both is the same: to visually highlight the most active areas.

#### Missing Features

- Post Details: Although the number of posts is shown, more detailed information on each post (for example, when multiple filters are selected, specify the account for each post type in the tooltip) could be added in the future.
- Tests: No tests are currently implemented. This would be the thing I would focus on most if I were to improve this application.

## Installation and Setup

## Installation

Clone the repository:

```bash
git clone https://github.com/olxmpe/coding-challenge-upfluence.git
```

```bash
cd coding-challenge-upfluence
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

## Code Quality and Structure

#### Code Organization

The code is organized into the following main components:

- Composables: Includes a reusable useSocialPosts composable that encapsulates the logic for handling social post counts, streaming control, and SSE connection.
- App Component : Contains the application’s core logic, including handling real-time data and managing the state for filters and streaming.
- HeatMap Component: Responsible for rendering the heatmap grid based on the number of posts and selected filters.
- ChartFilter Component: Renders individual filter options for each post type.

#### Code Style

The code follows standard Vue 3 (Composition API) and TypeScript practices. The Vue Composition API is used for better organization, and the code is written in a modular way to ensure that components can be reused and maintained efficiently. Whenever possible, I try to create components that are as generic as possible. This is the case with the heatmap, capable of receiving posts of any type, or the filters, automatically generated according to the types of posts sent by the stream.

#### UX Considerations

The design is simple and focused on usability. The heatmap layout is intuitive for displaying time-based data.
Filters are easy to toggle, and the interactive elements are clearly labeled.
The real-time updates provide a dynamic user experience, keeping users informed with up-to-date data.

## Future Improvements

- Optimize performance for higher posts volumes.
- Add more detailed post information.
