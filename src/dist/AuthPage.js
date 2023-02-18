"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var axios_1 = require("axios");
var react_1 = require("react");
// interface InstagramPhoto {
//   id: string;
//   media_url: string;
//   caption: string;
//   permalink: string;
// }
var AuthPage = function () {
    // const [photos, setPhotos] = useState<InstagramPhoto[]>([]);
    react_1.useEffect(function () {
        getPhotos();
    }, []);
    var getPhotos = function () { return __awaiter(void 0, void 0, void 0, function () {
        var params, code, clientId, clientSecret, redirectUri, grantType, url, headers, form;
        return __generator(this, function (_a) {
            params = Object.fromEntries(new URL(window.location.href).searchParams);
            console.log(params.code);
            code = params.code;
            clientId = "618692533418907";
            clientSecret = "ec3c052b63c820dc13b9a78ca52d65ea";
            redirectUri = "https://instagram-jade-iota.vercel.app/";
            grantType = "authorization_code";
            url = "https://api.instagram.com/oauth/access_token";
            headers = {
                "content-type": "multipart/form-data",
                host: "api.instagram.com"
            };
            form = new FormData();
            form.append("client_id", clientId);
            form.append("client_secret", clientSecret);
            form.append("redirect_uri", redirectUri);
            form.append("code", code);
            form.append("grant_type", grantType);
            axios_1["default"]
                .post(url, form, { headers: headers })
                .then(function (response) {
                console.log("Response ", response.data.access_token);
            })["catch"](function (error) {
                console.error("Error", error);
            });
            return [2 /*return*/];
        });
    }); };
    var handleLogin = function () {
        var clientId = "618692533418907";
        var redirectUri = "https://instagram-jade-iota.vercel.app/";
        var scope = "user_profile,user_media";
        var responseType = "code";
        var url = "https://api.instagram.com/oauth/authorize?client_id=" + clientId + "&redirect_uri=" + redirectUri + "&scope=" + scope + "&response_type=" + responseType;
        console.log(url);
        // localStorage.setItem("Url", JSON.stringify(url));
        window.location.replace(url);
    };
    return (react_1["default"].createElement("div", null,
        react_1["default"].createElement("button", { onClick: handleLogin }, " Login with Instagram ")));
};
exports["default"] = AuthPage;
