const Router = require("express");
const PostControllers = require("../controllers/postControllers");
const router = new Router();

router.post("/posts", PostControllers.createPost);
router.get("/posts", PostControllers.getPosts);
router.get("/posts/:id", PostControllers.getPostById);
router.put("/posts/:id", PostControllers.updatePost);
router.delete("/posts/:id", PostControllers.deletePost);

module.exports = router;
