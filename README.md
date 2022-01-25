# [110-1] MyDiary (Group 3)  日記一點通

## [服務簡介]
此系統提供會員之簡易日記操作，及資料夾之操作。

## [框架]
前端：React.js, axios
後端：Express Node.js, MVC
資料庫：MongoDB
前後端連接：HTTP API

## [第三方套件/程式碼]
後端：Google Drive API

## [CI平台]
前後端: Jenkins

## [部署平台]
前端Heroku連結: https://diary-frontend-app.herokuapp.com/
後端Heroku連結: https://diary-backend-app.herokuapp.com/

## [使用]
進入前端連結即可使用

## [詳細功能]
### 會員部分
首先可選擇註冊或是登入，請注意註冊的email不可重複，註冊後將會寄出一份驗證碼信件至註冊信箱，而頁面被導回驗證碼頁面，需輸入正確驗證碼才可進行登入。登入驗證方式是使用 jwt token 來做驗證，並且登入成功後會紀錄在瀏覽器中讓下次開啟時會自動登入。可以在登入頁面點選忘記密碼按鈕來重設密碼，系統將寄送一份隨機生成密碼供使用者登入，登入後便可透過右上角之重設密碼來設定新密碼。

### 資料夾部分
使用者可在會員首頁查看現有資料夾，存在一個預設資料夾Uncategorized，除了預設資料夾，所有資料夾皆可刪除及改名(名字不能重複)，點選一個資料夾，右側將顯示所有存在於該資料夾之日記。

### 日記部分
- 選擇日曆瀏覽日記，透過選擇日期來查詢該日期之日記
- 透過關鍵字來搜尋日記
- 主頁面的資料夾中找到想要的日記並瀏覽。
- 新增或是編輯日記，輸入想要的日記名稱，請注意日記的名稱不能重複，並選擇想要的日期以及存放的資料夾，並撰寫內容，請注意日記內容支援Markdown語法，填入HashTag方便搜尋使用，並上傳一張圖片作為日記封面使用。
- 日記預覽頁面，可以做日記收藏，分享，下載，以及刪除
- 可在右上角按鈕的FavoritePage內看到所有最愛之日記




