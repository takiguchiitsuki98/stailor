"use client";
import React, { useState } from "react";

export default function CsvUpload() {
  // csvファイルのデータを読み取る
  const uploadfile = () => {
    // 「CSVファイル選択」ボタンを押してファイルが選択されたときのfileオブジェクトを取得
    const file = document.querySelector("input[type=file]") as HTMLFormElement;

    if (file.files[0].type === "text/csv") {
      // FileReader関数は同期関数なのでPromise化して非同期でCSVデータを読み込む
      return new Promise((resolve, reject) => {
        // console.dir(file.files[0]);
        // Creating the object of FileReader Class
        var read = new FileReader();
        // when readAsText will invoke, onload() method on the read object will execute.
        read.onload = function (e: ProgressEvent<FileReader>) {
          // ヘッダー行の値配列を取得
          const headers: any = (e.target?.result as string)
            .split("\n")[0]
            .split(/,|\n|\r\n|\r/);

          headers.pop();
          console.log(headers);

          // csvファイルの1行目はデータではないので1行目をsliceしたデータのみ配列に変換する
          // splitで改行(\rと\n)を堺にして一件分のデータを配列に変換する
          const result1 = (e.target?.result as string)
            .slice((e.target?.result as string).indexOf("\n") + 1)
            .split(/\n|\r\n|\r/);

          // 繰り返しでコンマを堺にした新しい配列を作る
          const arr: any = [];
          for (let i of result1) {
            arr.push(i.split(/,/));
          }
          console.log(arr);

          const newArr: { [prop: string]: any }[] = [];

          //1レコードごとにオブジェクトに格納
          for (let [index1, ar] of arr.entries()) {
            newArr[index1] = {};
            for (let [index2, head] of headers.entries()) {
              switch (head) {
                case "請求額（税抜）":
                case "消費税":
                case "請求額（税込）":
                case "利用開始日":
                case "利用終了日":
                case "課金年月":
                  newArr[index1][head] = Number(ar[index2]);
                  break;

                default:
                  newArr[index1][head] = ar[index2];
              }
            }
          }

          console.log(newArr);

          // 親IDがELから始まるレコードのみを抽出
          const ELArr = newArr.filter(function (obj) {
            const pattern = /^EL*/;
            return obj["親ID"].match(pattern);
          });

          const productArr: any[] = [];

          for (let i of ELArr) {
            if (!productArr.includes(i["料金項目コード１"])) {
              productArr.push(i["料金項目コード１"]);
            }
          }
          console.log(productArr);

          // 親IDごとのオプションをオブジェクトに格納する
          const parentObj: any = {};
          for (let i of ELArr) {
            // console.log(i);
            // console.log(i['料金項目コード１'])
            if (!Object.keys(parentObj).includes(i["親ID"])) {
              parentObj[i["親ID"]] = {};

              switch (i["料金項目コード１"]) {
                case "36000030":
                  const result1 = Number(
                    i["料金項目名"]
                      .match(/[０-９]+/)[0]
                      .replace(/[０-９]/g, function (s: string) {
                        return String.fromCharCode(s.charCodeAt(0) - 65248);
                      })
                  );
                  parentObj[i["親ID"]]["使用量"] = result1;
                  break;
                case "36000035":
                  const result2 = i["料金項目名"]
                    .match(/([０-９]+)ｋｇ/)[1]
                    .replace(/[Ａ-Ｚａ-ｚ０-９]/g, function (s: string) {
                      return String.fromCharCode(s.charCodeAt(0) - 65248);
                    });
                  parentObj[i["親ID"]]["CO2排出見込"] = result2;
                  break;
                case "36000040":
                  const result3 = i["料金項目名"]
                    .match(/[０-９]+/)[0]
                    .replace(/[０-９]/g, function (s: string) {
                      return String.fromCharCode(s.charCodeAt(0) - 65248);
                    });
                  parentObj[i["親ID"]]["供給地点特定番号"] = result3;
                  break;
              }
            } else {
              switch (i["料金項目コード１"]) {
                case "36000030":
                  const result1 = Number(
                    i["料金項目名"]
                      .match(/[０-９]+/)[0]
                      .replace(/[０-９]/g, function (s: string) {
                        return String.fromCharCode(s.charCodeAt(0) - 65248);
                      })
                  );
                  parentObj[i["親ID"]]["使用量"] = result1;
                  break;
                case "36000035":
                  const result2 = i["料金項目名"]
                    .match(/([０-９]+)ｋｇ/)[0]
                    .replace(/[Ａ-Ｚａ-ｚ０-９]/g, function (s: string) {
                      return String.fromCharCode(s.charCodeAt(0) - 65248);
                    });
                  parentObj[i["親ID"]]["CO2排出見込"] = result2;
                  break;
                case "36000040":
                  const result3 = i["料金項目名"]
                    .match(/[０-９]+/)[0]
                    .replace(/[０-９]/g, function (s: string) {
                      return String.fromCharCode(s.charCodeAt(0) - 65248);
                    });
                  parentObj[i["親ID"]]["供給地点特定番号"] = result3;
                  break;
              }
            }
          }

          console.log(parentObj);

          // 明細テーブルに取り込むレコードのみ抽出
          const filterdArr = newArr.filter(function (obj) {
            const pattern = /^EL*/;
            return (
              obj["親ID"].match(pattern) &&
              obj["請求額（税抜）"] !== 0 &&
              obj["消費税"] !== 0 &&
              obj["請求額（税込）"] !== 0
            );
          });
          console.log(filterdArr);

          // 明細データに契約プランなどのオプションを追加する
          for (let i of filterdArr) {
            Object.assign(i, parentObj[i["親ID"]]);
          }

          console.log(filterdArr);

          console.log(filterdArr[3]["顧客コード"]);

          const getData = async (
            obj: {
              [prop: string]: any;
            }[]
          ) => {
            const res = await fetch(`http://localhost:3000/api/csv`, {
              cache: "no-store",
            });
            const data = await res.json();
            console.log(data);

            for (let j of obj) {
              for (let i of data) {
                if (i.forvalId === j["顧客コード"]) {
                  j["syshanId"] = i.syshanId;
                  j["userName"] = i.customerName;
                  j["status"] = 0;
                  break;
                } else {
                  j["status"] = 8;
                }
              }
            }

            console.log(JSON.stringify(filterdArr[0]));

            fetch("http://localhost:3000/api/csv/post", {
              method: "POST",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
              },
              body: JSON.stringify(filterdArr),
            });
          };

          getData(filterdArr);

          console.log(filterdArr);

          // 加工したcsvデータをpostメソッドで明細テーブルにinsertするapi処理を呼び出す

          resolve(newArr);
        };
        // Invoking the readAsText() method by passing the uploaded file as a parameter
        read.readAsText(file.files[0], "ANSI");
      });
    } else {
      console.log("flie type wrong");
    }
    file.value = "";
  };

  return (
    <div className="min-h-screen">
      <label
        htmlFor="csv_file_upload"
        className="w-[200px] block text-center mx-4 my-4 py-2 bg-blue-500 hover:bg-blue-700 text-white font-bold px-4 rounded cursor-pointer"
      >
        <p className=" w-auto block">CSVファイル選択</p>
        <input
          type="file"
          className="hidden "
          id="csv_file_upload"
          onChange={uploadfile}
        />
      </label>
    </div>
  );
}
