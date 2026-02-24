import "reflect-metadata"; 
import "dotenv/config";
import App from "./app";
import PostRoute from "./modules/posts/post.route";
import ChatRoute from "./modules/chats/chat.route";




const routes = [
  new PostRoute(),
  new ChatRoute(),
];

const app = new App(routes);

app.listen();
