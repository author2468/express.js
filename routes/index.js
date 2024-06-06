var express = require("express");
var router = express.Router();
const moduleDns = require("../module/dns");

/* GET home page. */
router.get(
	"/",
	function (req, res, next) {
		// next() 是一个中间件函数中的参数，用于将控制权传递给下一个中间件函数或路由处理程序，使它们按照定义的顺序依次执行。
		// console.log("1");
		next();
	},
	function (req, res, next) {
		// console.log("2");
		next();
	},
	function (req, res) {
		// console.log("3");
		res.render("index", { title: "Express" });
	}
);

// 注册 dns 接口 domainname 如：domainname
router.get("/module/dns/:domainname", async (context) => {
	// console.log("context", context.params);
	let pageText = "domainname is null";
	if (context.params.domainname) {
		pageText = await moduleDns.resolveDomain(context.params.domainname);
	}
	// context.res.send("32");
	context.res.render("template", {
		pageText: context.params.domainname + ": " + JSON.stringify(pageText),
	});
});

module.exports = router;
