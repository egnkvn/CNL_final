# Usage
1. 把User的照片放在labels裏面對應名字的資料夾，並且把照片依照編號命名為``num.jpg``
2. 把script.js中的getLabeledFaceDescriptions裡的``labels``改成所有Users的名字。並且調整迴圈的次數為每個User有多少張照片。
3. 在 https://huggingface.co/rocca/openai-clip-js 下載CLIP模型的text encoder和image encoder，放在models中

# Function
1. 如果偵測到多餘2人，``console.log(number_of_people)``
2. 如果只有一個人，偵測是否在圖片庫裡
3. 如果在圖片庫裡，偵測是否用圖片來欺騙系統
