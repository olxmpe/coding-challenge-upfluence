
# Social Post Visualization

#### Description
This project is a front-end application designed to visualize social media posts in a heatmap-like structure, based on three key dimensions:

- Day of the week: Represents the day the post was created.
- Hour of the day: Represents the hour at which the post was created.
- Number of posts: The total number of posts that match the above dimensions.

The application consumes a real-time stream of social posts via Server-Sent Events (SSE) from the publicly available Upfluence API, and visualizes this data using a heatmap style grid.

The application is deployed on  https://olxmpe.github.io/coding-challenge-upfluence/

### Features
- Real-time Updates: The application updates in real-time.
- Interactive filters: Allows users to select and deselect filters based on post types (e.g. Instagram, Tweet, etc.). When multiple filters are selected, the data is combined.
- Heatmap display: Displays posts as a heatmap, color-coded according to the number of posts. The more posts, the more intense the color.
- Streaming Control: Allows users to start, pause, and reset the data stream.
- Automatic generation of filters based on the types of posts sent by the stream


### Technical Choices
#### Architecture
The application follows a clear separation of concerns with components, services and composables :

Vue 3: I used Vue 3 with the composition API, which is the technology I'm most familiar with, for the sake of maintainability and greater modularity in component construction.

SSE for real-time data: The application uses events sent by the server (SSE) to consume real-time data from the Upfluence API, with the information arriving in real time, with no refresh latency.

HeatMap component: A custom, in-house HeatMap component is used to visualize social messages in a grid.

#### Compromises and decisions
After a quick POC of Chart.js, I realized that I was wasting more time tinkering with a chart to make it look like a punchcard than coding a heat map (which is just a grid with colored backgrounds) by hand. I chose a heatmap rather than a punchcard for simplicity's sake, because the aim of both is the same: to visually highlight the areas with the most activity. 

#### Missing Features
Post Details: While the post count is shown, more detailed information about each post (e.g., post content) could be added in the future.

Mobile Responsiveness: The current layout works well on desktop and mobile, but mobile responsiveness could be further refined.

Smoother, less jerky animation of heatmap color changes

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

Open the application in your browser at http://localhost:3000.
## Code Quality and Structure

#### Code Organization
The code is organized into the following main components:

- App Component : Contains the application’s core logic, including handling real-time data and managing the state for filters and streaming.
- HeatMap Component: Responsible for rendering the heatmap grid based on the number of posts and selected filters.
- ChartFilter Component: Renders individual filter options for each post type.
- Composables: Includes a reusable useSocialPosts composable that encapsulates the logic for handling social post counts, streaming control, and SSE connection.

#### Testing
Testing is currently minimal in this implementation. However, if time permitted, unit tests for components and integration tests for the streaming functionality would be added.

#### Code Style
The code follows standard Vue 3 (Composition API) and TypeScript practices. The Vue Composition API is used for better organization, and the code is written in a modular way to ensure that components can be reused and maintained efficiently.

#### UX Considerations
The design is simple and focused on usability. The heatmap layout is intuitive for displaying time-based data.
Filters are easy to toggle, and the interactive elements are clearly labeled.
The real-time updates provide a dynamic user experience, keeping users informed with up-to-date data.

## Future Improvements
- Enhance mobile responsiveness.
- Optimize performance for higher post volumes.
- Add more detailed post information.

