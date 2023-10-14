'use client';

import { PDFDocument, StandardFonts, rgb } from "pdf-lib"
import fontkit from "@pdf-lib/fontkit"
import download from "downloadjs"
import SourceHanSansRegular from '../../../../public/fonts/HanSansJP/SourceHanSans-Regular.otf'
import dayjs from "dayjs";

const makeItem = (
  page: any, 
  taregtText: string, 
  textSize: number, 
  customFont: any, 
  x: number, 
  y: number, 
  width: number, 
  hight: number,
  opacity: number,
  borderWidth: number = 0.5
  ) => {
  const text = taregtText;
  page.drawText(" " + text, {
    x: x,
    y: y,
    size: textSize,
    font: customFont,
    // color: rgb(0, 0.53, 0.71),
  })
  page.drawRectangle({
    x: x,
    y: y - 5,
    width: width,
    height: hight + 5,
    borderColor: rgb(0, 0, 0),
    color: rgb(0, 0.53, 0.71),
    opacity: opacity,
    borderWidth: borderWidth,
  })
};

export const createPdf = async (pdfOutPutList: any) => {
  console.log("createPdf pdfOutPutList !!! :", pdfOutPutList)
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
  console.log("today :",today);
  // ページはA4サイズを想定
  const page = pdfDoc.addPage([595, 842]);
  const { width, height } = page.getSize();
  // const form = pdfDoc.getForm();
  // const headerFontSize = 15;

  // タイトル部
  page.drawText("電気利用明細書", {
    x: 238,
    y: height - 50,
    size: 20,
    font: customFont,
    // color: rgb(0, 0.53, 0.71),
  })

  // 発行日欄
  makeItem(page, "発行日 ", 10, customFont, 440, height - 100, 40, 12, 0);
  makeItem(page, "　　" + today, 10, customFont, 480, height - 100, 100, 12, 0);

  // 住所欄
  makeItem(page, "郵便番号 ", 10, customFont, 30, height - 130, 50, 12, 0.1);
  makeItem(page, " " + record.syshanInfo?.postcode, 10, customFont, 80, height - 130, 200, 12, 0);

  makeItem(page, "住所 ", 10, customFont, 30, height - 147, 50, 12, 0.1);
  makeItem(page, " " + record.syshanInfo?.address, 10, customFont, 80, height - 147, 200, 12, 0);

  makeItem(page, "お客様名 ", 10, customFont, 30, height - 164, 50, 12, 0.1);
  makeItem(page, " " + record.syshanInfo?.customerName, 10, customFont, 80, height - 164, 200, 12, 0);

  // syshan住所欄
  makeItem(page, " syshan株式会社 ", 8, customFont, 380, height - 130, 200, 12, 0);
  makeItem(page, " 〒203-0053 東京都東久留米市本町3-9-16 ", 7, customFont, 380, height - 147, 200, 12, 0);
  makeItem(page, " TEL:042-476-0240 / FAX:042-476-0150 ", 7, customFont, 380, height - 164, 200, 12, 0);

  //ご請求金額欄
  page.drawText("毎度ご利用いただきましてありがとうございます。ご請求額をご案内致します。", {
    x: 35,
    y: height - 200,
    size: 10,
    font: customFont,
    // color: rgb(0, 0.53, 0.71),
  })
  makeItem(page, " ご請求金額 ", 10, customFont, 30, height - 220, 200, 12, 0.1);
  makeItem(page, " 　　　　　　　　　　　　　　　　　　　　　　　　　" + Number(record.totalAmount).toLocaleString() +" 円 ", 10, customFont, 230, height - 220, 350, 12, 0);

  makeItem(page, " (内消費税相当額)  ", 10, customFont, 30, height - 237, 200, 12, 0.1);
  makeItem(page, " 　　　　　　　　　　　　　　　　　　　　　　　　　" + Number(record.tax).toLocaleString() +" 円 ", 10, customFont, 230, height - 237, 350, 12, 0);
   
  // 請求内容詳細欄
  page.drawText("【請求内容詳細】", {
    x: 35,
    y: height - 260,
    size: 9,
    font: customFont,
    // color: rgb(0, 0.53, 0.71),
  })
  makeItem(page, " ご契約番号  ", 10, customFont, 30, height - 275, 100, 12, 0.1);
  makeItem(page, record.syshanId, 9, customFont, 130, height - 275, 150, 12, 0);

  makeItem(page, " 供給地点特定番号 ", 10, customFont, 30, height - 292, 100, 12, 0.1);
  makeItem(page, record.supplyNumberId, 9, customFont, 130, height - 292, 150, 12, 0);
  
  makeItem(page, " 供給地点地点名 ", 10, customFont, 30, height - 309, 100, 12, 0.1);
  makeItem(page, record.supplyNumber?.supplyName, 9, customFont, 130, height - 309, 150, 12, 0);

  makeItem(page, " ご契約名義 ", 10, customFont, 30, height - 326, 100, 12, 0.1);
  makeItem(page, record.supplyNumber?.contractorName, 9, customFont, 130, height - 326, 150, 12, 0);

  makeItem(page, " 供給地点住所 ", 10, customFont, 30, height - 343, 100, 12, 0.1);
  makeItem(page, record.supplyNumber?.supplyAdress, 9, customFont, 130, height - 343, 150, 12, 0);

  makeItem(page, " ご契約料金メニュー ", 10, customFont, 30, height - 360, 100, 12, 0.1);
  makeItem(page, record.supplyNumber?.contractDetails, 9, customFont, 130, height - 360, 150, 12, 0);

  makeItem(page, " ご契約電流 ", 10, customFont, 30, height - 377, 100, 12, 0.1);
  makeItem(page, record.supplyNumber?.contractCurrent, 9, customFont, 130, height - 377, 150, 12, 0);

  makeItem(page, " ご使用期間 ", 10, customFont, 30, height - 394, 100, 12, 0.1);
  
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
  makeItem(page, startDay.format("YYYY/M/D") + " ～ " + endDay.format("YYYY/M/D"), 9, customFont, 130, height - 394, 150, 12, 0);

  makeItem(page, " ご使用日数 ", 10, customFont, 30, height - 411, 100, 12, 0.1);
  const diff = endDay.diff(startDay, "day");
  makeItem(page, " 30 / " + diff, 10, customFont, 130, height - 411, 150, 12, 0);

  makeItem(page, " 当月ご使用量 ", 10, customFont, 30, height - 428, 100, 12, 0.1);
  makeItem(page, String(record.useAmount), 10, customFont, 130, height - 428, 150, 12, 0);

  // お支払い方法欄
  makeItem(page, " お支払い方法   ", 10, customFont, 300, height - 290, 100, 12, 0.1);
  makeItem(page, record.supplyNumber?.paymentMethod, 10, customFont, 400, height - 290, 180, 12, 0);

  makeItem(page, " 口座振替日   ", 10, customFont, 300, height - 307, 100, 12, 0.1);
  makeItem(page, " 2023/8/10  ", 10, customFont, 400, height - 307, 180, 12, 0);

  page.drawText("     電源供給元 株式会社フォーバルテレコム ", {
    x: 300,
    y: height - 324,
    size: 9,
    font: customFont,
  })
  page.drawText(" ▼口座振替が不可能となった場合、下記口座にお振込みください。 ", {
    x: 300,
    y: height - 341,
    size: 9,
    font: customFont,
  })
  page.drawRectangle({
    x: 300,
    y: height - 346,
    width: 280,
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
    width: 180,
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
    width: 180,
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
    width: 180,
    height: 36,
    borderColor: rgb(0, 0, 0),
    borderWidth: 0.5,
  })

  // 料金項目詳細
  makeItem(page, "  料金項目 ", 10, customFont, 30, height - 500, 120, 15, 0.1);
  makeItem(page, "  単価(円) 税込み ", 10, customFont, 150, height - 500, 80, 15, 0.1);
  makeItem(page, "       A  ", 10, customFont, 230, height - 500, 40, 15, 0.1);
  makeItem(page, "     kVA  ", 10, customFont, 270, height - 500, 40, 15, 0.1);
  makeItem(page, "     kW  ", 10, customFont, 310, height - 500, 40, 15, 0.1);
  makeItem(page, "     kWh  ", 10, customFont, 350, height - 500, 40, 15, 0.1);
  makeItem(page, " 　金額(円)税込 ", 10, customFont, 390, height - 500, 80, 15, 0.1);
  makeItem(page, " 　　　備考 ", 10, customFont, 470, height - 500, 110, 15, 0.1);

  makeItem(page, " <<電気料金>> ", 10, customFont, 30, height - 517, 120, 12, 0.1);
  makeItem(page, " 　 ", 10, customFont, 150, height - 517, 80, 12, 0);
  makeItem(page, " 　1.0  ", 10, customFont, 230, height - 517, 40, 12, 0);
  makeItem(page, " 　2.0  ", 10, customFont, 270, height - 517, 40, 12, 0);
  makeItem(page, " 　3.0  ", 10, customFont, 310, height - 517, 40, 12, 0);
  makeItem(page, " 　4.0  ", 10, customFont, 350, height - 517, 40, 12, 0);
  makeItem(page, " 　　　1,234 ", 10, customFont, 390, height - 517, 80, 12, 0);
  makeItem(page, " テスト ", 10, customFont, 470, height - 517, 110, 12, 0);
   
  makeItem(page, " 電力量料金 ", 10, customFont, 30, height - 534, 120, 12, 0.1);
  makeItem(page, " 　　 ", 10, customFont, 150, height - 534, 80, 12, 0);
  makeItem(page, " 　　  ", 10, customFont, 230, height - 534, 40, 12, 0);
  makeItem(page, " 　　  ", 10, customFont, 270, height - 534, 40, 12, 0);
  makeItem(page, " 　　  ", 10, customFont, 310, height - 534, 40, 12, 0);
  makeItem(page, " 　299  ", 10, customFont, 350, height - 534, 40, 12, 0);
  makeItem(page, " 　　　3,796 ", 10, customFont, 390, height - 534, 80, 12, 0);
  makeItem(page, " テスト ", 10, customFont, 470, height - 534, 110, 12, 0);

  // こちらのレイアウトを参考に正式対応する
  makeItem(page, record.chargeItemCode?.productName, 10, customFont, 30, height - 551, 120, 12, 0.1);
  makeItem(page, "　　　　　　" + String(record.chargeItemCode?.unitPrice.toLocaleString()), 10, customFont, 150, height - 551, 80, 12, 0);
  makeItem(page, " 　　  ", 10, customFont, 230, height - 551, 40, 12, 0);
  makeItem(page, " 　　  ", 10, customFont, 270, height - 551, 40, 12, 0);
  makeItem(page, " 　　  ", 10, customFont, 310, height - 551, 40, 12, 0);
  makeItem(page, " 　" + String(record.useAmount), 10, customFont, 350, height - 551, 40, 12, 0);
  makeItem(page, " 　　　" + String(record.totalAmount.toLocaleString()), 10, customFont, 390, height - 551, 80, 12, 0);
  makeItem(page, "  ", 10, customFont, 470, height - 551, 110, 12, 0);

  makeItem(page, " 再エネ賦課金 ", 10, customFont, 30, height - 568, 120, 12, 0.1);
  makeItem(page, " 　　 ", 10, customFont, 150, height - 568, 80, 12, 0);
  makeItem(page, " 　　  ", 10, customFont, 230, height - 568, 40, 12, 0);
  makeItem(page, " 　　  ", 10, customFont, 270, height - 568, 40, 12, 0);
  makeItem(page, " 　　  ", 10, customFont, 310, height - 568, 40, 12, 0);
  makeItem(page, " 　　  ", 10, customFont, 350, height - 568, 40, 12, 0);
  makeItem(page, " 　　　", 10, customFont, 390, height - 568, 80, 12, 0);
  makeItem(page, "  ", 10, customFont, 470, height - 568, 110, 12, 0);

  makeItem(page, " 諸手数料 ", 10, customFont, 30, height - 585, 120, 12, 0.1);
  makeItem(page, " 　　 ", 10, customFont, 150, height - 585, 80, 12, 0);
  makeItem(page, " 　　  ", 10, customFont, 230, height - 585, 40, 12, 0);
  makeItem(page, " 　　  ", 10, customFont, 270, height - 585, 40, 12, 0);
  makeItem(page, " 　　  ", 10, customFont, 310, height - 585, 40, 12, 0);
  makeItem(page, " 　　  ", 10, customFont, 350, height - 585, 40, 12, 0);
  makeItem(page, " 　　　", 10, customFont, 390, height - 585, 80, 12, 0);
  makeItem(page, "  ", 10, customFont, 470, height - 585, 110, 12, 0);

  makeItem(page, "  小計 ", 10, customFont, 30, height - 605, 120, 15, 0.1);
  makeItem(page, "  ", 10, customFont, 150, height - 605, 320, 15, 0);
  page.drawText(String(record.totalAmount.toLocaleString()), {
    x: 424,
    y: height - 605,
    size: 10,
    font: customFont,
  })
  makeItem(page, "  ", 10, customFont, 30, height - 605, 550, 15, 0, 1.5);

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
  page.drawText(" 　　　　123 ", {
    x: 390,
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
    width: 110,
    height: 57,
    borderColor: rgb(0, 0, 0),
    borderWidth: 0.5,
  })

  makeItem(page, "  政府補助分  ", 10, customFont, 30, height - 679, 120, 12, 0.1);
  makeItem(page, "  ", 10, customFont, 150, height - 679, 320, 12, 0);
  page.drawText(" 　　　-2,093 ", {
    x: 390,
    y: height - 679,
    size: 10,
    font: customFont,
  })
  page.drawRectangle({
    x: 470,
    y: height - 684,
    width: 110,
    height: 17,
    borderColor: rgb(0, 0, 0),
    borderWidth: 0.5,
  })

  makeItem(page, "  ご請求金額  ", 10, customFont, 30, height - 699, 120, 15, 0.1);
  makeItem(page, "  ", 10, customFont, 150, height - 699, 320, 15, 0);
  page.drawText(String(record.totalAmount.toLocaleString()), {
    x: 424,
    y: height - 699,
    size: 10,
    font: customFont,
  })
  makeItem(page, "  ", 10, customFont, 30, height - 700, 550, 15, 0, 1.5);

  const pdfBytes = await pdfDoc.save();
  download(pdfBytes, "billing_" + today + ".pdf", "application/pdf");
}