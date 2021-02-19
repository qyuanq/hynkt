(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["components/questions/comment"],{

/***/ 347:
/*!*****************************************************************************!*\
  !*** C:/Users/apple/Desktop/慧永诺课堂项目/hynkt/components/questions/comment.vue ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _comment_vue_vue_type_template_id_d4475d1c___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./comment.vue?vue&type=template&id=d4475d1c& */ 348);
/* harmony import */ var _comment_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./comment.vue?vue&type=script&lang=js& */ 350);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _comment_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _comment_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _comment_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./comment.vue?vue&type=style&index=0&lang=scss& */ 352);
/* harmony import */ var _vue_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../vue/小程序/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js */ 10);

var renderjs





/* normalize component */

var component = Object(_vue_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _comment_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _comment_vue_vue_type_template_id_d4475d1c___WEBPACK_IMPORTED_MODULE_0__["render"],
  _comment_vue_vue_type_template_id_d4475d1c___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null,
  false,
  _comment_vue_vue_type_template_id_d4475d1c___WEBPACK_IMPORTED_MODULE_0__["components"],
  renderjs
)

component.options.__file = "components/questions/comment.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ 348:
/*!************************************************************************************************************!*\
  !*** C:/Users/apple/Desktop/慧永诺课堂项目/hynkt/components/questions/comment.vue?vue&type=template&id=d4475d1c& ***!
  \************************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _vue_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_vue_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_vue_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_vue_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_vue_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_vue_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_comment_vue_vue_type_template_id_d4475d1c___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../vue/小程序/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../vue/小程序/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--16-0!../../../../vue/小程序/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!../../../../vue/小程序/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!../../../../vue/小程序/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../../../vue/小程序/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./comment.vue?vue&type=template&id=d4475d1c& */ 349);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _vue_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_vue_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_vue_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_vue_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_vue_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_vue_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_comment_vue_vue_type_template_id_d4475d1c___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _vue_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_vue_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_vue_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_vue_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_vue_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_vue_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_comment_vue_vue_type_template_id_d4475d1c___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return _vue_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_vue_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_vue_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_vue_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_vue_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_vue_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_comment_vue_vue_type_template_id_d4475d1c___WEBPACK_IMPORTED_MODULE_0__["recyclableRender"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "components", function() { return _vue_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_vue_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_vue_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_vue_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_vue_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_vue_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_comment_vue_vue_type_template_id_d4475d1c___WEBPACK_IMPORTED_MODULE_0__["components"]; });



/***/ }),

/***/ 349:
/*!************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--16-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!C:/Users/apple/Desktop/慧永诺课堂项目/hynkt/components/questions/comment.vue?vue&type=template&id=d4475d1c& ***!
  \************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return recyclableRender; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "components", function() { return components; });
var components
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
}
var recyclableRender = false
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ 350:
/*!******************************************************************************************************!*\
  !*** C:/Users/apple/Desktop/慧永诺课堂项目/hynkt/components/questions/comment.vue?vue&type=script&lang=js& ***!
  \******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _vue_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_vue_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_vue_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_vue_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_vue_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_comment_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../vue/小程序/HBuilderX/plugins/uniapp-cli/node_modules/babel-loader/lib!../../../../vue/小程序/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--12-1!../../../../vue/小程序/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!../../../../vue/小程序/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../../../vue/小程序/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./comment.vue?vue&type=script&lang=js& */ 351);
/* harmony import */ var _vue_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_vue_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_vue_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_vue_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_vue_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_comment_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_vue_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_vue_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_vue_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_vue_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_vue_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_comment_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _vue_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_vue_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_vue_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_vue_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_vue_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_comment_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _vue_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_vue_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_vue_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_vue_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_vue_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_comment_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_vue_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_vue_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_vue_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_vue_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_vue_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_comment_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 351:
/*!*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--12-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!C:/Users/apple/Desktop/慧永诺课堂项目/hynkt/components/questions/comment.vue?vue&type=script&lang=js& ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _regenerator = _interopRequireDefault(__webpack_require__(/*! ./node_modules/@babel/runtime/regenerator */ 12));


























































var _common = __webpack_require__(/*! ../../static/js/common.js */ 15);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {try {var info = gen[key](arg);var value = info.value;} catch (error) {reject(error);return;}if (info.done) {resolve(value);} else {Promise.resolve(value).then(_next, _throw);}}function _asyncToGenerator(fn) {return function () {var self = this,args = arguments;return new Promise(function (resolve, reject) {var gen = fn.apply(self, args);function _next(value) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);}function _throw(err) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);}_next(undefined);});};}var comment = function comment() {Promise.resolve(/*! require.ensure */).then((function () {return resolve(__webpack_require__(/*! ./comment */ 347));}).bind(null, __webpack_require__)).catch(__webpack_require__.oe);};var praise = function praise() {__webpack_require__.e(/*! require.ensure | components/questions/praise */ "components/questions/praise").then((function () {return resolve(__webpack_require__(/*! ./praise */ 362));}).bind(null, __webpack_require__)).catch(__webpack_require__.oe);};var _default =
{
  name: 'comment',
  components: { praise: praise, comment: comment },
  props: {
    comment: {
      type: Object } },


  data: function data() {
    return {
      SERVER: this.development,
      children: null, //回复集合
      countShow: true, //显示等多少条回复
      commentPlaceholder: '', //输入框提示值
      replyUserComment: null, //评论对象
      isShow: false,
      btnShow: false, //回复菜单
      content: '', //文本框内容
      popupShow: false, //长按菜单
      actions: [//长按菜单菜单项
      { name: '回复' },
      { name: '复制评论' }],

      isName: false, //标识:actions是否存在{name:'删除'}，默认为不存在
      pageSize: 1, //当前分页页码
      countPage: null, //后端返回的总页码
      myInfo: null //当前用户信息
    };
  },
  created: function created() {
    // 获取当前用户的信息
    this.myInfo = uni.getStorageSync('user');
  },
  computed: {
    //新值代替接收父组件传递的comment
    commentData: function commentData() {
      return this.comment;
    },
    // 点赞url
    onLikeUrl: function onLikeUrl() {
      return this.comment.CommentsModelId ? "".concat(this.SERVER, "/api/like?userId=").concat(this.myInfo.id, "&replayId=").concat(this.comment.id) : "".concat(this.SERVER, "/api/like?userId=").concat(this.myInfo.id, "&commentId=").concat(this.comment.id);
    },
    // 点赞状态url
    isLikeUrl: function isLikeUrl() {
      return this.comment.CommentsModelId ? "".concat(this.SERVER, "/api/isLike?userId=").concat(this.myInfo.id, "&replayId=").concat(this.comment.id) : "".concat(this.SERVER, "/api/isLike?userId=").concat(this.myInfo.id, "&commentId=").concat(this.comment.id);
    } },

  methods: {
    // 获取全部回复，参数：评论id
    getReplay: function getReplay(commentId) {var _this = this;return _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee() {var url, res;return _regenerator.default.wrap(function _callee$(_context) {while (1) {switch (_context.prev = _context.next) {case 0:
                url = "".concat(_this.SERVER, "/api/replays/").concat(commentId);_context.next = 3;return (
                  _this.pageLoad(url, _this.pageSize, _this.children));case 3:res = _context.sent;
                _this.children = res.comments.map(function (item) {
                  // 格式化时间
                  item.date = (0, _common.renderTime)(item.date);
                  // 回复存储答疑id
                  item.AnserquestionModelId = _this.commentData.AnserquestionModelId;
                  return item;
                });
                // 将回复挂载到评论上
                _this.commentData.children = _this.children;
                // 通知父组件更新评论内容
                _this.$emit('changeCommentContent', _this.commentData);
                // 不显示等多少条回复
                _this.countShow = false;
                // 设置分页页码
                _this.countPage = res.countPage;case 9:case "end":return _context.stop();}}}, _callee);}))();
    },
    replyUser: function replyUser(comment) {
      // 调起回复输入框
      this.btnShow = true;
      // 改变输入框提示内容
      this.commentPlaceholder = '回复@' + comment.users_model.username;
      comment.replay_models ? comment.index2 = 0 : comment.index2 = 1;
      comment.countShow = this.countShow;
      this.replyUserComment = comment; //保存当前评论对象
      console.log('查看to_user', this.replyUserComment);
    },
    // 关闭弹窗
    onPopupClose: function onPopupClose() {
      this.btnShow = false;
    },
    // 回复评论
    submit: function submit() {var _this2 = this;
      // 定义当前时间
      var myDate = (0, _common.renderTime)(new Date());
      if (this.content == "") {
        uni.showToast({
          title: '输入内容不能为空' });

      } else {
        var CommentsModelId;
        // 说明点击的回复
        if (this.replyUserComment.CommentsModelId) {
          CommentsModelId = this.replyUserComment.CommentsModelId;
        } else {
          // 说明点击的评论
          CommentsModelId = this.replyUserComment.id;
        }
        // 定义data传递给后端
        var comment = {
          AnserquestionModelId: this.replyUserComment.AnserquestionModelId,
          CommentsModelId: CommentsModelId,
          to_user_id: this.replyUserComment.users_model.id,
          level: this.replyUserComment.index2,
          data: {
            content: this.content,
            date: myDate } };


        this.request({
          url: "".concat(this.SERVER, "/api/comments"),
          method: 'post',
          data: comment,
          success: function () {var _success = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee2(res) {var newComment, index2;return _regenerator.default.wrap(function _callee2$(_context2) {while (1) {switch (_context2.prev = _context2.next) {case 0:
                      console.log('添加成功返回数据', comment);
                      uni.showToast({
                        title: '评论成功' });

                      // 前端显示评论信息
                      newComment = {
                        AnserquestionModelId: _this2.replyUserComment.AnserquestionModelId,
                        UsersModelId: _this2.replyUserComment.users_model.id,
                        CommentsModelId: CommentsModelId,
                        id: res.data.data.id,
                        content: _this2.content,
                        date: '刚刚',
                        users_model: {
                          //显示token 的头像和用户名
                          id: _this2.myInfo.id,
                          icon: _this2.myInfo.icon,
                          username: _this2.myInfo.username } };


                      index2 = _this2.replyUserComment.index2;
                      if (index2) {//回复其他人的回复
                        // newComment.content = '回复@'+ this.replyUserComment.users_model.username + newComment.content;
                        newComment.level = 1;
                        newComment.to_user = {
                          username: _this2.replyUserComment.users_model.username };

                        console.log("new", newComment, _this2.$parent.children);
                        _this2.$parent.commentData.children.push(newComment);
                        // 派发更新评论内容
                        uni.$emit('changeCommentContent', _this2.$parent.commentData);
                      } else {//回复评论
                        // 等多少条回复显示，说明回复内容未展开
                        if (_this2.replyUserComment.countShow) {
                          _this2.commentData.text = _this2.content;
                          _this2.commentData.replay_models.length = _this2.commentData.replay_models.length ? _this2.commentData.replay_models.length + 1 : 1;
                        } else {
                          //等多少条回复未显示，说明回复内容已展开
                          _this2.commentData.children.unshift(newComment);
                          _this2.commentData.replay_models.length = _this2.commentData.children.length;
                        }
                        // 通知父组件更新评论内容
                        _this2.$emit('changeCommentContent', _this2.commentData);
                      }
                      _this2.content = '';
                      _this2.btnShow = false;
                      // 评论总数 + 1
                      _this2.$root.question.comment += 1;case 8:case "end":return _context2.stop();}}}, _callee2);}));function success(_x) {return _success.apply(this, arguments);}return success;}() });



      }
    },
    // 是否显示删除项
    pupop: function pupop(userId) {var _this3 = this;
      uni.getStorage({
        key: 'user',
        success: function success(res) {
          // 评论或回复的用户id等于当前用户id，增加删除项
          if (userId === res.data.id && !_this3.isName) {
            _this3.actions.push({ name: '删除' });
            _this3.isName = true;
          }
        } });

      this.popupShow = true;
    },
    //关闭选项菜单
    onClose: function onClose() {
      this.popupShow = false;
    },
    // 取消操作
    onCancel: function onCancel() {
      this.popupShow = false;
    },
    // 选择选项操作
    onSelect: function onSelect(event, comment) {var _this4 = this;
      console.log('commentId', comment);
      if (event.detail.name === '回复') {
        this.replyUser(this.commentData);
        console.log('点击了回复');
      } else if (event.detail.name === '复制评论') {
        uni.setClipboardData({
          data: this.commentData.content });

      } else if (event.detail.name === '删除') {
        uni.showModal({
          content: "确定要删除评论吗?",
          showCancel: true,
          success: function success(res) {
            if (res.confirm) {
              // 删除评论或回复
              _this4.request({
                url: "".concat(_this4.SERVER, "/api/mycomments?comment=").concat(encodeURIComponent(JSON.stringify(comment))),
                method: 'delete',
                success: function success(res) {
                  console.log(res.data);
                  if (comment.replay_models) {
                    // 删除评论
                    _this4.$emit('deleteComment', comment.id);
                    // 评论总数-1
                    var count = comment.replay_models ? comment.replay_models.length + 1 : 1;
                    _this4.$root.question.comment -= count;
                  } else {
                    // 删除回复
                    _this4.$parent.children.forEach(function (item, index) {
                      // 找到要删除的回复的下标index
                      if (item.id === comment.id) {
                        _this4.$parent.children.splice(index, 1);
                      }
                    });
                    // 评论总数-1
                    _this4.$root.question.comment -= 1;
                  }
                  uni.showToast({
                    title: '删除成功',
                    icon: 'success' });

                } });

            } else if (res.cancel) {
              console.log('用户点击了取消');
            }
          } });

      }
    },
    // 展开更多
    showMore: function showMore(commentId) {var _this5 = this;return _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee3() {var url, res;return _regenerator.default.wrap(function _callee3$(_context3) {while (1) {switch (_context3.prev = _context3.next) {case 0:
                // 当前页加 1
                _this5.pageSize += 1;
                // 判断pageSize 是不是最后一页
                if (!(_this5.pageSize <= _this5.countPage)) {_context3.next = 10;break;}
                url = "".concat(_this5.SERVER, "/api/replays/").concat(commentId, "/").concat(_this5.pageSize);_context3.next = 5;return (
                  _this5.pageLoad(url, _this5.pageSize, _this5.children));case 5:res = _context3.sent;
                _this5.children = res.map(function (item) {
                  // 格式化时间
                  if (item.date !== '刚刚') {
                    item.date = (0, _common.renderTime)(item.date);
                  }
                  // 回复存储答疑id
                  item.AnserquestionModelId = _this5.commentData.AnserquestionModelId;
                  return item;
                });
                // 将回复挂载到评论上
                _this5.commentData.children = _this5.children;_context3.next = 11;break;case 10:

                console.log('没有数据了');case 11:case "end":return _context3.stop();}}}, _callee3);}))();

    } } };exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 352:
/*!***************************************************************************************************************!*\
  !*** C:/Users/apple/Desktop/慧永诺课堂项目/hynkt/components/questions/comment.vue?vue&type=style&index=0&lang=scss& ***!
  \***************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _vue_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_vue_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_vue_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_vue_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_vue_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_vue_HBuilderX_plugins_uniapp_cli_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_vue_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_vue_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_vue_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_comment_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../vue/小程序/HBuilderX/plugins/uniapp-cli/node_modules/mini-css-extract-plugin/dist/loader.js??ref--8-oneOf-1-0!../../../../vue/小程序/HBuilderX/plugins/uniapp-cli/node_modules/css-loader/dist/cjs.js??ref--8-oneOf-1-1!../../../../vue/小程序/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!../../../../vue/小程序/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-2!../../../../vue/小程序/HBuilderX/plugins/uniapp-cli/node_modules/postcss-loader/src??ref--8-oneOf-1-3!../../../../vue/小程序/HBuilderX/plugins/uniapp-cli/node_modules/sass-loader/dist/cjs.js??ref--8-oneOf-1-4!../../../../vue/小程序/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-5!../../../../vue/小程序/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../../../vue/小程序/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./comment.vue?vue&type=style&index=0&lang=scss& */ 353);
/* harmony import */ var _vue_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_vue_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_vue_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_vue_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_vue_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_vue_HBuilderX_plugins_uniapp_cli_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_vue_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_vue_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_vue_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_comment_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_vue_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_vue_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_vue_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_vue_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_vue_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_vue_HBuilderX_plugins_uniapp_cli_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_vue_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_vue_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_vue_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_comment_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _vue_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_vue_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_vue_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_vue_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_vue_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_vue_HBuilderX_plugins_uniapp_cli_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_vue_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_vue_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_vue_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_comment_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _vue_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_vue_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_vue_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_vue_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_vue_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_vue_HBuilderX_plugins_uniapp_cli_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_vue_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_vue_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_vue_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_comment_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_vue_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_vue_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_vue_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_vue_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_vue_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_vue_HBuilderX_plugins_uniapp_cli_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_vue_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_vue_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_vue_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_comment_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 353:
/*!*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??ref--8-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--8-oneOf-1-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-2!./node_modules/postcss-loader/src??ref--8-oneOf-1-3!./node_modules/sass-loader/dist/cjs.js??ref--8-oneOf-1-4!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-5!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!C:/Users/apple/Desktop/慧永诺课堂项目/hynkt/components/questions/comment.vue?vue&type=style&index=0&lang=scss& ***!
  \*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(false) { var cssReload; }
  

/***/ })

}]);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/components/questions/comment.js.map
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/questions/comment-create-component',
    {
        'components/questions/comment-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('1')['createComponent'](__webpack_require__(347))
        })
    },
    [['components/questions/comment-create-component']]
]);
