const Pusher = require('pusher');

let pusher = new Pusher({
  appId: '392599',
  key: '1277d8035ae3e1d1c3d4',
  secret: '5db54a39968f9d8620a4',
  cluster: 'eu',
  encrypted: true
});

exports.comment_post = (req, res, next) => {

    console.log(req.body);
    let newComment = {
      name: req.body.name,
      email: req.body.email,
      comment: req.body.comment
    }
    pusher.trigger('flash-comments', 'new_comment', newComment);
    res.json({  created: true });

};

