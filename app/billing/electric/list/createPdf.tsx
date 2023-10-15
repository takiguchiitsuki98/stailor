'use client';

import { PDFDocument, StandardFonts, rgb } from "pdf-lib"
import fontkit from "@pdf-lib/fontkit"
import download from "downloadjs"
import SourceHanSansRegular from '../../../../public/fonts/HanSansJP/SourceHanSans-Regular.otf'
import dayjs from "dayjs";

interface DrawObj {
  page: any;
  customFont: any;
}

/**
 * 項目と枠線を描画する
 * x=0 → 一番左　
 * y=0 → 一番下
 */
const makeItem = (
  drawObj: DrawObj,
  taregtText: string, 
  textSize: number, 
  x: number, 
  y: number, 
  width: number, 
  type: string,
  dataType: string,
  height: number = 12
  ) => {
  const text = taregtText;
  // 数値項目の表示位置の調整処理
  const targetXLength = taregtText.length * 6;
  let length = 0;
  if (dataType === "num") {
    length = width / 2;
    if (length < targetXLength ) {
      length = length - (targetXLength - length)
    } else if (length / 2 > targetXLength) {
      length = length + length / 2;
    }
  }  
  const xPosition = dataType === "num" ? length : 0;
  drawObj.page.drawText(" " + text, {
    x: x + xPosition,
    y: y,
    size: textSize,
    font: drawObj.customFont,
    // color: rgb(0, 0.53, 0.71),
  });
  const opacity = type === "header" ? 0.1 : 0; 
  drawObj.page.drawRectangle({
    x: x,
    y: y - 5,
    width: width,
    height: height + 5,
    borderColor: rgb(0, 0, 0),
    color: rgb(0, 0.53, 0.71),
    opacity: opacity,
    borderWidth: 0.5,
  });
};

// PDF作成処理
export const createPdf = async (pdfOutPutList: any) => {
  // console.log("createPdf pdfOutPutList :", pdfOutPutList)
  const pdfDoc = await PDFDocument.create()
  pdfDoc.registerFontkit(fontkit)

  // 日本語化
  const fontBytes = await fetch(SourceHanSansRegular).then((res) => res.arrayBuffer());
  if (!fontBytes) {
    alert("ファイルの読み込みに失敗しました")
    return;
  }
  const customFont = await pdfDoc.embedFont(fontBytes);

  // TODO 本来はここはリストで回すように作る
  const record = pdfOutPutList[0]; 
  const today = dayjs().format("YYYY/M/D");
  // ページはA4サイズを想定
  const page = pdfDoc.addPage([595, 842]);
  // 高さは上から指定される為、heightオブジェクトを使用
  const { width, height } = page.getSize();
  // 共通関数に引き渡す為のオブジェクト　※コード量削減の為
  const drawObj: DrawObj = {page, customFont};

  // タイトル部
  page.drawText("電気利用明細書", {
    x: 238,
    y: height - 50,
    size: 20,
    font: customFont,
    // color: rgb(0, 0.53, 0.71),
  })


  // 発行日欄
  makeItem(drawObj, "発行日 ", 10, 440, height - 100, 40, "data", "str");
  makeItem(drawObj, today, 10, 480, height - 100, 90, "data", "str");

  // 住所欄
  makeItem(drawObj, "郵便番号 ", 10, 30, height - 130, 50, "header", "str");
  makeItem(drawObj, " " + record.syshanInfo?.postcode, 10,  80, height - 130, 200, "data", "str");

  makeItem(drawObj, "住所 ", 10, 30, height - 147, 50, "header", "str");
  makeItem(drawObj, " " + record.syshanInfo?.address, 10,  80, height - 147, 200, "data", "str");

  makeItem(drawObj, "お客様名 ", 10, 30, height - 164, 50, "header", "str");
  makeItem(drawObj, " " + record.syshanInfo?.customerName, 10,  80, height - 164, 200, "data", "str");

  // syshan住所欄
  makeItem(drawObj, " syshan株式会社 ", 8, 380, height - 130, 190, "data", "str");
  makeItem(drawObj, " 〒203-0053 東京都東久留米市本町3-9-16 ", 7, 380, height - 147, 190, "data", "str");
  makeItem(drawObj, " TEL:042-476-0240 / FAX:042-476-0150 ", 7, 380, height - 164, 190, "data", "str");

  //ご請求金額欄
  page.drawText("毎度ご利用いただきましてありがとうございます。ご請求額をご案内致します。", {
    x: 35,
    y: height - 200,
    size: 10,
    font: customFont,
    // color: rgb(0, 0.53, 0.71),
  })
  makeItem(drawObj, " ご請求金額 ", 10, 30, height - 220, 200, "header", "str");
  makeItem(drawObj, Number(record.totalAmount).toLocaleString() + " 円 ", 10, 230, height - 220, 340, "data", "num");

  makeItem(drawObj, " (内消費税相当額)  ", 10, 30, height - 237, 200, "header", "str");
  makeItem(drawObj, Number(record.tax).toLocaleString() + " 円 ", 10, 230, height - 237, 340, "data", "num");

  // 請求内容詳細欄
  page.drawText("【請求内容詳細】", {
    x: 35,
    y: height - 275,
    size: 9,
    font: customFont,
    // color: rgb(0, 0.53, 0.71),
  })
  makeItem(drawObj, " ご契約番号  ", 10, 30, height - 290, 100, "header", "str");
  makeItem(drawObj, record.syshanId, 9, 130, height - 290, 150, "data", "str");

  makeItem(drawObj, " 供給地点特定番号 ", 10, 30, height - 307, 100, "header", "str");
  makeItem(drawObj, record.supplyNumberId, 9, 130, height - 307, 150, "data", "str");
  
  makeItem(drawObj, " 供給地点地点名 ", 10, 30, height - 324, 100, "header", "str");
  makeItem(drawObj, record.supplyNumber?.supplyName, 9, 130, height - 324, 150, "data", "str");

  makeItem(drawObj, " ご契約名義 ", 10, 30, height - 341, 100, "header", "str");
  makeItem(drawObj, record.supplyNumber?.contractorName, 9,  130, height - 341, 150, "data", "str");

  makeItem(drawObj, " 供給地点住所 ", 10, 30, height - 358, 100, "header", "str");
  makeItem(drawObj, record.supplyNumber?.supplyAdress, 9,  130, height - 358, 150, "data", "str");

  makeItem(drawObj, " ご契約料金メニュー ", 10, 30, height - 375, 100, "header", "str");
  makeItem(drawObj, record.supplyNumber?.contractDetails, 9,  130, height - 375, 150, "data", "str");

  makeItem(drawObj, " ご契約電流 ", 10, 30, height - 392, 100, "header", "str");
  makeItem(drawObj, record.supplyNumber?.contractCurrent, 9,  130, height - 392, 150, "data", "str");

  makeItem(drawObj, " ご使用期間 ", 10, 30, height - 409, 100, "header", "str");
  const startDay = record.startDay && dayjs()
    .year(record.startDay.toString().substr(0, 4))
    .month(record.startDay.toString().substr(4, 2))
    .date(record.startDay.toString().substr(7, 2));
    console.log("startDay! ", startDay)
    console.log("startDay! format ", startDay.format("YYYY/M/D"))
  const endDay = record.endDay && dayjs()
    .year(record.endDay.toString().substr(0, 4))
    .month(record.endDay.toString().substr(4, 2))
    .date(record.endDay.toString().substr(7, 2));
    console.log("endDay! ", endDay)
    console.log("endDay! format ", endDay.format("YYYY/M/D"))
  makeItem(drawObj, startDay.format("YYYY/M/D") + " ～ " + endDay.format("YYYY/M/D"), 9,  130, height - 409, 150, "data", "str");

  makeItem(drawObj, " ご使用日数 ", 10,  30, height - 426, 100, "header", "str");
  const diff = endDay.diff(startDay, "day");
  makeItem(drawObj, " 30 / " + diff, 10,  130, height - 426, 150, "data", "str");

  makeItem(drawObj, " 当月ご使用量 ", 10,  30, height - 443, 100, "header", "str");
  makeItem(drawObj, String(record.useAmount) + " kWh", 10,  130, height - 443, 150, "data", "str");

  // お支払い方法欄
  makeItem(drawObj, " お支払い方法   ", 10,  300, height - 290, 100, "header", "str");
  makeItem(drawObj, record.supplyNumber?.paymentMethod, 10,  400, height - 290, 170, "data", "str");

  makeItem(drawObj, " 口座振替日   ", 10,  300, height - 307, 100, "header", "str");
  makeItem(drawObj, " 2023/8/10  ", 10,  400, height - 307, 170, "data", "str");

  page.drawText("     電源供給元 株式会社フォーバルテレコム ", {
    x: 300,
    y: height - 324,
    size: 9,
    font: customFont,
  })
  page.drawText(" ▼口座振替が不可能となった場合、下記口座にお振込みください。", {
    x: 300,
    y: height - 341,
    size: 9,
    font: customFont,
  })
  page.drawRectangle({
    x: 300,
    y: height - 346,
    width: 270,
    height: 34,
    borderColor: rgb(0, 0, 0),
    borderWidth: 0.5,
  })

  page.drawText(" 振込先 ", {
    x: 300,
    y: height - 360,
    size: 10,
    font: customFont,
  })
  page.drawRectangle({
    x: 300,
    y: height - 444,
    width: 100,
    height: 98,
    borderColor: rgb(0, 0, 0),
    borderWidth: 0.5,
    color: rgb(0, 0.53, 0.71),
    opacity: 0.1
  })

  page.drawText("    西武信用金庫  ", {
    x: 400,
    y: height - 358,
    size: 9,
    font: customFont,
  })
  page.drawText("    東久留米支店(普)   ", {
    x: 400,
    y: height - 368,
    size: 9,
    font: customFont,
  })
  page.drawText("    0088152  ", {
    x: 400,
    y: height - 378,
    size: 9,
    font: customFont,
  })
  page.drawRectangle({
    x: 400,
    y: height - 382,
    width: 170,
    height: 36,
    borderColor: rgb(0, 0, 0),
    borderWidth: 0.5,
  })

  page.drawText("    多摩信用金庫  ", {
    x: 400,
    y: height - 392,
    size: 9,
    font: customFont,
  })
  page.drawText("    東久留米支店(普)   ", {
    x: 400,
    y: height - 402,
    size: 9,
    font: customFont,
  })
  page.drawRectangle({
    x: 400,
    y: height - 408,
    width: 170,
    height: 26,
    borderColor: rgb(0, 0, 0),
    borderWidth: 0.5,
  })

  page.drawText("    みずほ銀行  ", {
    x: 400,
    y: height - 417,
    size: 9,
    font: customFont,
  })
  page.drawText("    所沢支店(普)    ", {
    x: 400,
    y: height - 427,
    size: 9,
    font: customFont,
  })
  page.drawText("    1335425  ", {
    x: 400,
    y: height - 437,
    size: 9,
    font: customFont,
  })
  page.drawRectangle({
    x: 400,
    y: height - 444,
    width: 170,
    height: 36,
    borderColor: rgb(0, 0, 0),
    borderWidth: 0.5,
  })

  // 料金項目詳細
  makeItem(drawObj, "  料金項目 ", 10,  30, height - 500, 120, "header", "str");
  makeItem(drawObj, "  単価(円) 税込み ", 10,  150, height - 500, 80, "header", "str");
  makeItem(drawObj, "       A  ", 10,  230, height - 500, 40, "header", "str");
  makeItem(drawObj, "     kVA  ", 10,  270, height - 500, 40, "header", "str");
  makeItem(drawObj, "     kW  ", 10,  310, height - 500, 40, "header", "str");
  makeItem(drawObj, "     kWh  ", 10,  350, height - 500, 40, "header", "str");
  makeItem(drawObj, " 　金額(円)税込 ", 10,  390, height - 500, 80, "header", "str");
  makeItem(drawObj, " 　　　備考 ", 10,  470, height - 500, 100, "header", "str");

  makeItem(drawObj, "<<電気料金>> ", 10,  30, height - 517, 120, "header", "str");
  makeItem(drawObj, "", 10,  150, height - 517, 80, "data", "num");
  makeItem(drawObj, "1.0", 10,  230, height - 517, 40, "data", "num");
  makeItem(drawObj, "2.0", 10,  270, height - 517, 40, "data", "num");
  makeItem(drawObj, "3.0", 10,  310, height - 517, 40, "data", "num");
  makeItem(drawObj, "4.0", 10,  350, height - 517, 40, "data", "num");
  makeItem(drawObj, "12,234 ", 10,  390, height - 517, 80, "data", "num");
  makeItem(drawObj, "テスト ", 10,  470, height - 517, 100, "data", "str");
   
  makeItem(drawObj, "電力量料金 ", 10,  30, height - 534, 120, "header", "str");
  makeItem(drawObj, " 　　 ", 10,  150, height - 534, 80, "data", "num");
  makeItem(drawObj, " 　　  ", 10,  230, height - 534, 40, "data", "num");
  makeItem(drawObj, " 　　  ", 10,  270, height - 534, 40, "data", "num");
  makeItem(drawObj, " 　　  ", 10,  310, height - 534, 40, "data", "num");
  makeItem(drawObj, "299 ", 10,  350, height - 534, 40, "data", "num");
  makeItem(drawObj, "9,123,79", 10,  390, height - 534, 80, "data", "num");
  makeItem(drawObj, "テスト ", 10,  470, height - 534, 100, "data", "str");

  // こちらのレイアウトを参考に正式対応する
  makeItem(drawObj, record.chargeItemCode?.productName, 10,  30, height - 551, 120, "header", "str");
  makeItem(drawObj, String(record.chargeItemCode?.unitPrice.toLocaleString()), 10,  150, height - 551, 80, "data", "num");
  makeItem(drawObj, "　　  ", 10,  230, height - 551, 40, "data", "num");
  makeItem(drawObj, "　　  ", 10,  270, height - 551, 40, "data", "num");
  makeItem(drawObj, "　　  ", 10,  310, height - 551, 40, "data", "num");
  makeItem(drawObj, String(record.useAmount) + " ", 10,  350, height - 551, 40, "data", "num");
  makeItem(drawObj, String(record.totalAmount.toLocaleString()), 10,  390, height - 551, 80, "data", "num");
  makeItem(drawObj, "  ", 10,  470, height - 551, 100, "data", "str");

  makeItem(drawObj, "再エネ賦課金 ", 10,  30, height - 568, 120, "header", "str");
  makeItem(drawObj, "　　 ", 10,  150, height - 568, 80, "data", "num");
  makeItem(drawObj, "　　  ", 10,  230, height - 568, 40, "data", "num");
  makeItem(drawObj, "　　  ", 10,  270, height - 568, 40, "data", "num");
  makeItem(drawObj, "　　  ", 10,  310, height - 568, 40, "data", "num");
  makeItem(drawObj, "　　  ", 10,  350, height - 568, 40, "data", "num");
  makeItem(drawObj, "　　　", 10,  390, height - 568, 80, "data", "num");
  makeItem(drawObj, "  ", 10,  470, height - 568, 100, "data", "str");

  makeItem(drawObj, "諸手数料 ", 10,  30, height - 585, 120, "header", "str");
  makeItem(drawObj, " 　　 ", 10,  150, height - 585, 80, "data", "num");
  makeItem(drawObj, " 　　  ", 10,  230, height - 585, 40, "data", "num");
  makeItem(drawObj, " 　　  ", 10,  270, height - 585, 40, "data", "num");
  makeItem(drawObj, " 　　  ", 10,  310, height - 585, 40, "data", "num");
  makeItem(drawObj, " 　　  ", 10,  350, height - 585, 40, "data", "num");
  makeItem(drawObj, " 　　　", 10,  390, height - 585, 80, "data", "num");
  makeItem(drawObj, "  ", 10,  470, height - 585, 100, "data", "str");

  makeItem(drawObj, "  小計 ", 10,  30, height - 605, 120, "header", "str", 15);
  makeItem(drawObj, "  ", 10,  150, height - 605, 320, "data", "num", 15);
  page.drawText(String(record.totalAmount.toLocaleString()), {
    x: 428,
    y: height - 605,
    size: 10,
    font: customFont,
  })
  page.drawRectangle({
    x: 30,
    y: height - 610,
    width: 540,
    height: 20,
    borderColor: rgb(0, 0, 0),
    color: rgb(0, 0.53, 0.71),
    opacity: 0,
    borderWidth: 1.0,
  })

  page.drawText(" その他 ", {
    x: 30,
    y: height - 625,
    size: 10,
    font: customFont,
  })
  page.drawText(" 諸費用  ", {
    x: 30,
    y: height - 647,
    size: 10,
    font: customFont,
  })
  page.drawText(" (送電量,システム管理量)  ", {
    x: 30,
    y: height - 662,
    size: 10,
    font: customFont,
  })
  page.drawRectangle({
    x: 30,
    y: height - 667,
    width: 120,
    height: 57,
    borderColor: rgb(0, 0, 0),
    color: rgb(0, 0.53, 0.71),
    opacity: 0.1,
    borderWidth: 0.5,
  })
  page.drawText(" 123 ", {
    x: 428,
    y: height - 647,
    size: 10,
    font: customFont,
  })
  page.drawRectangle({
    x: 150,
    y: height - 667,
    width: 320,
    height: 57,
    borderColor: rgb(0, 0, 0),
    borderWidth: 0.5,
  })
  page.drawRectangle({
    x: 470,
    y: height - 667,
    width: 100,
    height: 57,
    borderColor: rgb(0, 0, 0),
    borderWidth: 0.5,
  })

  makeItem(drawObj, "  政府補助分  ", 10,  30, height - 679, 120, "header", "str");
  makeItem(drawObj, "  ", 10,  150, height - 679, 320, "data", "str");
  page.drawText(" -2,093 ", {
    x: 428,
    y: height - 679,
    size: 10,
    font: customFont,
  })
  page.drawRectangle({
    x: 470,
    y: height - 684,
    width: 100,
    height: 17,
    borderColor: rgb(0, 0, 0),
    borderWidth: 0.5,
  })

  makeItem(drawObj, "  ご請求金額  ", 10,  30, height - 699, 120, "header", "str", 15);
  makeItem(drawObj, "  ", 10,  150, height - 699, 320, "data", "str", 15);
  page.drawText(String(record.totalAmount.toLocaleString()), {
    x: 428,
    y: height - 699,
    size: 10,
    font: customFont,
  })
  page.drawRectangle({
    x: 30,
    y: height - 704,
    width: 540,
    height: 20,
    borderColor: rgb(0, 0, 0),
    color: rgb(0, 0.53, 0.71),
    opacity: 0,
    borderWidth: 1.0,
  })

  const pdfBytes = await pdfDoc.save();
  download(pdfBytes, "billing_" + today + ".pdf", "application/pdf");
}