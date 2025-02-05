const express = require("express");
const userModel = require("./users-model");
const postModel = require("../posts/posts-model");
const mw = require("../middleware/middleware");

// `users-model.js` ve `posts-model.js` sayfalarına ihtiyacınız var
// ara yazılım fonksiyonları da gereklidir

const router = express.Router();

router.get("/", async (req, res, next) => {
  // TÜM KULLANICILARI İÇEREN DİZİYİ DÖNDÜRÜN
  try {
    res.json(await userModel.get());
  } catch (error) {
    next(error);
  }
});

router.get("/:id", mw.validateUserId, (req, res, next) => {
  // USER NESNESİNİ DÖNDÜRÜN
  // user id yi getirmek için bir ara yazılım gereklidir
  try {
    // const user= userModel.getById() (middlewarede zaten databasee gittik tekrar gitmeyelim diye aşağıdaki şekilde yaptık)
    // res.json(user)
    res.json(req.user);
  } catch (error) {
    next(error);
    //üst satırda next yazıyorsan en üstte 3. argüman olarak next yazman gerekir
  }
});

router.post("/", mw.validateUser, async (req, res, next) => {
  try {
    const user = await userModel.insert(req.body);
    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
  // YENİ OLUŞTURULAN USER NESNESİNİ DÖNDÜRÜN
  // istek gövdesini doğrulamak için ara yazılım gereklidir.
});

router.put(
  "/:id",
  mw.validateUserId,
  mw.validateUser,
  async (req, res, next) => {
    try {
      const updatedUser = await userModel.update(req.params.id, req.body);
      res.status(201).json(updatedUser);
    } catch (error) {
      next(error);
      //next serverın çökmesini engelliyor,hata döndürüyor//
    }
  }
);

router.delete("/:id", mw.validateUserId, async (req, res, next) => {
  // SON SİLİNEN USER NESNESİ DÖNDÜRÜN
  // user id yi doğrulayan bir ara yazılım gereklidir.
  try {
    await userModel.remove(req, params.id);
    //const deleted=await userModel.remove(req,params.id);
    //res.json(deleted)// middlewarede id ile getirtme yazmıştık direkt onu kullandık aşağıdaki satırda
    res.json(req.user);
  } catch (error) {
    next(error);
  }
});

router.get("/:id/posts", mw.validateUserId, async (req, res) => {
  // USER POSTLARINI İÇEREN BİR DİZİ DÖNDÜRÜN
  // user id yi doğrulayan bir ara yazılım gereklidir.
  const posts = await userModel.getUserPosts(req.params.id);
  res.json(posts);
});

router.post(
  "/:id/posts",
  mw.validateUserId,
  mw.validatePost,
  async (req, res, next) => {
    // YENİ OLUŞTURULAN post NESNESİNİ DÖNDÜRÜN
    // user id yi doğrulayan bir ara yazılım gereklidir.
    // ve istek gövdesini doğrulayan bir ara yazılım gereklidir.
    try {
      const newPost = await postModel.insert({
        user_id: req.params.id,
        text: req.body.text,
      });
      res.status(201).json(newPost);
    } catch (error) {
      next(error);
    }
  }
);

// routerı dışa aktarmayı unutmayın
module.exports = router;
