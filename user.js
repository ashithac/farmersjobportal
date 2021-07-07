var express = require('express');

var router = express.Router();
const jobHelper=require('../helpers/job-helpers')
const userHelpers=require('../helpers/user-helpers')


/* GET home page. */
router.get('/', function(req, res, next) {
  jobHelper.getAllJobs().then((jobs)=>{
    console.log(jobs)
    res.render('user/view-jobs',{jobs})
  })
});
router.get('/login',(req,res)=>{
  res.render('user/login')
})
router.get('/signup',(req,res)=>{
  res.render('user/signup')
})
router.post('/signup',(req,res)=>{
  userHelpers.doSignup(req.body).then((response)=>{
    console.log(response)
  })
})
router.post('/login',(req,res)=>{
  userHelpers.doLogin(req.body).then((response)=>{
    if(response.status){
      res.redirect('/')
    }else{
      res.redirect('/login')
    }
  })
})

module.exports = router;
