function formatZero(input, slice) {
  let binaryString = input.toString();
  let formattedArrayHtml = [];
  let formattedArray = [];
  let groupSize = slice;

  while (binaryString.length % groupSize !== 0) {
    binaryString = "0" + binaryString;
  }

  for (let i = 0; i < binaryString.length; i += groupSize) {
    let group = binaryString.slice(i, i + groupSize);
    formattedArrayHtml.push(...group.split(""));
    formattedArray.push(...group.split(""));
    if (i + groupSize < binaryString.length) {
      formattedArrayHtml.push("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;");
      formattedArray.push("");
    }
  }

  const newformattedHtml = formattedArrayHtml.map((e) =>
    e == "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"
      ? e
      : `<span class="g-s">${e}</span>`
  );

  return { newformattedHtml, formattedArray };
}

function formateNumsSpace(array) {
  const spanSpace = "<span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>";
  const hexToDecimal = {
    A: 10,
    B: 11,
    C: 12,
    D: 13,
    E: 14,
    F: 15,
  };

  const numsDecimalfillSpace = array
    .map((e) => `<span>${e}</span>${spanSpace}`)
    .join("")
    .slice(0, -spanSpace.length)
    .trim();

  const numsDecimalfill = array
    .map((e) => {
      const decimalValue = hexToDecimal[e] !== undefined ? hexToDecimal[e] : e;
      return `<span>${decimalValue}</span>${spanSpace}`;
    })
    .join("")
    .slice(0, -spanSpace.length)
    .trim();
  return { numsDecimalfill, numsDecimalfillSpace };
}

//------------------------ decimal to binary --------------------

const input1 = document.getElementById("input");
const result = document.getElementById("result");

function extractBinary(n) {
  const binArrayColor = [];
  const binArray = [];
  const remData = [];
  const quoData = [];
  const divData = [];
  const dataCount = [];

  if (n == 0) {
    binArrayColor.push(0);
    binArray.push(0);
    divData.push(0);
    remData.push(0);
    quoData.push(0);
  } else {
    while (n > 0) {
      let rem = n % 2;
      if (rem == 0) {
        binArrayColor.push(`<span class="zero-c">${rem}</span>`);
      } else {
        binArrayColor.push(`<span class="one-c">${rem}</span>`);
      }
      binArray.push(rem);
      remData.push(rem);
      quoData.push(n);
      divData.push(2);
      n = Math.floor(n / 2);
    }
  }

  const binArrayReversed = binArray.reverse().join("");
  const binArrayColorReversed = binArrayColor.reverse().join("");
  divData.pop();
  remData.pop();
  divData.filter((e, i) => dataCount.push(i + 1 + "."));
  divData.push("");
  remData.push("");
  dataCount.push("");
  return {
    binArrayReversed,
    binArrayColorReversed,
    divData,
    quoData,
    remData,
    dataCount,
  };
}

let decimalToBinaryContent = ``;

function decimalToBinary() {
  const value = input1.value;
  const nums = parseInt(Number(value));
  input1.value = value;

  if (value.length > 0) {
    const {
      binArrayReversed,
      binArrayColorReversed,
      divData,
      quoData,
      remData,
      dataCount,
    } = extractBinary(nums);
    const remDataReverse = [...remData]
      .map((e) => e + " ")
      .reverse()
      .join("");

    if (value.length > 1) {
      input1.value = nums;
    }
    let filteredContent = ``;
    let tableContent =
      "<table><tr><th>Step</th><th>Divisor</th><th>Quotient</th><th>Remainder</th></tr>";
    for (let i = 0; i < remData.length; i++) {
      tableContent += `<tr><td>${dataCount[i]}</td><td>${divData[i]}</td><td>${quoData[i]}</td><td>${remData[i]}</td></tr>`;
    }
    tableContent += "</table>";
    if (nums >= 2) {
      filteredContent = ` 
          ${tableContent}
          <p class="show-num"> Represent it as the last quotient <b>1</b> followed
          by the remainders from bottom to top <b>${remDataReverse}</b>, like this : 
          <span class="s-n">${binArrayReversed}</span></p>`;
    } else {
      filteredContent = `<p class="message">No Need to Conversion Steps</p>`;
    }
    result.innerHTML = `
      <div class="numbers">${binArrayColorReversed}</div>
       <div class="table-container">
         <p class="head">Decimal Digit:</p>
          <div class="number">${nums}</div>
        <p class="head pad">In Binary Conversion:</p>
        <div class="number">${binArrayReversed}</div>
      </div>
       <div class="table-container">
        <p class="head">Conversion in base:</p>
        <div class="base">
          <p>(${nums})<sub>10</sub> = (${binArrayReversed})<sub>2</sub></p>
        </div>
      </div>
      <div class="table-container">
        <p class="head">Conversion Steps:</p>
        ${filteredContent}
      </div>`;
  } else {
    result.innerHTML = "";
  }
}

input1.addEventListener("input", decimalToBinary);

//------------------- binary to decimal -------------------

const input2 = document.getElementById("input2");
const result2 = document.getElementById("result2");

function extractDecimal(nums) {
  let deciNum = 0;
  const calData = [];

  for (let i = nums.length - 1; i >= 0; i--) {
    deciNum += parseInt(nums[nums.length - 1 - i], 2) * Math.pow(2, i);
    let cal = parseInt(nums[nums.length - 1 - i], 2) * Math.pow(2, i);
    calData.push(cal);
  }

  const coloredDeciNum = [];
  [deciNum]
    .join("")
    .split("")
    .forEach((e) => {
      if (e == 0) {
        coloredDeciNum.push(`<span class="zero-c">${e}</span>`);
      } else {
        coloredDeciNum.push(`<span class="one-c">${e}</span>`);
      }
    });

  return { deciNum, coloredDeciNum, calData };
}

function binaryToDecimal() {
  const value = input2.value.trim();
  const nums = value.split("").filter((e) => e == "0" || e == "1");

  if (nums.length >= 2 && nums[0] == 0) {
    nums.shift();
  }
  input2.value = nums.join("");
  if (value.length > 0) {
    if (value >= 2) {
      result2.innerHTML = `<div class="table-container">
         <p class="message">Enter number combination of 0 and 1:</p>
      </div>`;
    }
    if (nums.length !== 0) {
      const data = extractDecimal(nums);
      const coloredDecimalResult = data.coloredDeciNum;
      const decimalResult = data.deciNum;
      const calData = data.calData;
      const numsReversed = nums.slice().reverse();
      let tableContent =
        "<table><tr><th>Step</th><th>Conversion</th><th>Power</th></tr>";
      let paraContent = `<div class="solve"><p class="num">${nums.join(
        ""
      )}</p><div class="cal-con"><p class="cal">`;
      for (let i = numsReversed.length - 1; i >= 0; i--) {
        tableContent += `<tr><td>${numsReversed.length - i}.</td><td><span>${
          numsReversed[i]
        }</span> x <span>2<sup>${i}</sup></span></td><td>${i}</td></tr>`;
        paraContent += `<span class="n">${numsReversed[i]}</span> x <span>2<sup>${i}</sup></span>`;
        if (i !== 0) {
          paraContent += " + ";
        }
        if (i == 0) {
          paraContent += `<p class="cal-2">`;
        }
      }
      for (let j = 0; j < calData.length; j++) {
        paraContent += `<span>${calData[j]}</span>`;
        if (j !== calData.length - 1) {
          paraContent += " + ";
        }
      }
      tableContent += "</table>";
      paraContent += `</p><p class="cal-2">${decimalResult}</p>
      <p class="cal-3">(${nums.join(
        ""
      )})<sub>2</sub> = (${decimalResult})<sub>10</sub></p></div></div>`;

      let filteredContent = "";
      if (value.length > 1) {
        filteredContent = `     
        ${tableContent}
       <p class="head pad">Solution:</p>
        ${paraContent}`;
      } else {
        filteredContent = `<p class="message">No Need To Conversion Steps</p>`;
      }
      result2.innerHTML = `
      <p class="numbers">${coloredDecimalResult.join("")}</p>
        <div class="table-container">
         <p class="head">Binary Number:</p>
          <div class="number">${nums.join("")}</div>
        <p class="head pad">In Decimal Conversion:</p>
        <div class="number">${decimalResult}</div>
      </div>
      <div class="table-container">
        <p class="head">Conversion in base:</p>
        <div class="base">
          <p>(${nums.join(
            ""
          )})<sub>2</sub> = (${decimalResult})<sub>10</sub></p>
        </div>
      </div>
      <div class="table-container">
        <p class="head">Conversion Steps:</p>
        ${filteredContent}
      </div>`;
    }
  } else {
    result2.innerHTML = "";
  }
}

input2.addEventListener("input", binaryToDecimal);

//-------------------------- decimal to octal ----------------------

const input3 = document.getElementById("input3");
const result3 = document.getElementById("result3");

function extractOcta(n) {
  const octArrayColor = [];
  const octArray = [];
  const remData = [];
  const quoData = [];
  const divData = [];
  const dataCount = [];

  if (n == 0) {
    octArrayColor.push(0);
    octArray.push(0);
    divData.push(0);
    remData.push(0);
    quoData.push(0);
  } else {
    while (n > 0) {
      let rem = n % 8;
      if (rem == 0) {
        octArrayColor.push(`<span class="zero-c">${rem}</span>`);
      } else {
        octArrayColor.push(`<span class="one-c">${rem}</span>`);
      }
      octArray.push(rem);
      remData.push(rem);
      quoData.push(n);
      divData.push(8);
      n = Math.floor(n / 8);
    }
  }

  const octArrayReversed = octArray.reverse().join("");
  const octArrayColorReversed = octArrayColor.reverse().join("");
  divData.pop();
  remData.pop();
  divData.filter((e, i) => dataCount.push(i + 1 + "."));
  divData.push("");
  remData.push("");
  dataCount.push("");
  return {
    octArrayReversed,
    octArrayColorReversed,
    divData,
    quoData,
    remData,
    dataCount,
  };
}

function decimalToOcta() {
  const value = input3.value;
  const nums = parseInt(Number(value));
  input3.value = value;

  if (value.length > 0) {
    const {
      octArrayReversed,
      octArrayColorReversed,
      divData,
      quoData,
      remData,
      dataCount,
    } = extractOcta(nums);
    const remDataReverse = [...remData]
      .map((e) => e + " ")
      .reverse()
      .join("");
    let filteredContent = "";
    let tableContent =
      "<table><tr><th>Step</th><th>Divisor</th><th>Quotient</th><th>Remainder</th></tr>";
    for (let i = 0; i < remData.length; i++) {
      tableContent += `<tr><td>${dataCount[i]}</td><td>${divData[i]}</td><td>${quoData[i]}</td><td>${remData[i]}</td></tr>`;
    }
    tableContent += "</table>";
    if (nums > 7) {
      filteredContent = ` 
        ${tableContent}
         <p class="show-num"> Represent as last quotient <b>1</b> and 
         remainder <b>${remDataReverse}</b> like this : <span class="s-n">${octArrayReversed}</span> </p>`;
    } else {
      filteredContent = `<p class="message">No Need to Conversion Steps</p>`;
    }
    result3.innerHTML = `
      <div class="numbers">${octArrayColorReversed}</div>
       <div class="table-container">
         <p class="head">Decimal Number:</p>
          <div class="number">${nums}</div>
        <p class="head pad">In Octal Conversion:</p>
        <div class="number">${octArrayReversed}</div>
      </div>
       <div class="table-container">
        <p class="head">Conversion in base:</p>
        <div class="base">
          <p>(${nums})<sub>10</sub> = (${octArrayReversed})<sub>8</sub></p>
        </div>
      </div>
      <div class="table-container">
        <p class="head">Conversion Steps:</p>
         ${filteredContent}
      </div>`;
  } else {
    result3.innerHTML = "";
  }
}

input3.addEventListener("input", decimalToOcta);

//--------------------------- octal to decimal -----------------------

const input5 = document.getElementById("input5");
const result5 = document.getElementById("result5");

function extractOctaDecimal(nums) {
  let deciNum = 0;
  let calData = [];

  for (let i = nums.length - 1; i >= 0; i--) {
    deciNum += parseInt(nums[nums.length - 1 - i], 8) * Math.pow(8, i);
    let cal = parseInt(nums[nums.length - 1 - i], 8) * Math.pow(8, i);
    calData.push(cal);
  }

  const coloredDeciNum = [];
  [deciNum]
    .join("")
    .split("")
    .forEach((e) => {
      if (e == 0) {
        coloredDeciNum.push(`<span class="zero-c">${e}</span>`);
      } else {
        coloredDeciNum.push(`<span class="one-c">${e}</span>`);
      }
    });

  return { deciNum, coloredDeciNum, calData };
}

function octaToDecimal() {
  const value = input5.value.trim();
  const nums = value.split("").filter((e) => e >= "0" && e <= "7");

  if (nums.length >= 2 && nums[0] == 0) {
    nums.shift();
  }
  input5.value = nums.join("");
  if (value.length > 0) {
    if (value >= 8) {
      result5.innerHTML = `<div class="table-container">
         <p class="message">Enter number combination less than 8:</p>
      </div>`;
    }
    if (nums.length !== 0) {
      const data = extractOctaDecimal(nums);
      const coloredDecimalResult = data.coloredDeciNum;
      const decimalResult = data.deciNum;
      const calData = data.calData;
      const numsReversed = nums.slice().reverse();
      let filteredContent = "";
      let tableContent =
        "<table><tr><th>Step</th><th>Conversion</th><th>Power</th></tr>";
      let paraContent = `<div class="solve"><p class="num">${nums.join(
        ""
      )}</p><div class="cal-con"><p class="cal">`;
      for (let i = numsReversed.length - 1; i >= 0; i--) {
        tableContent += `<tr><td>${numsReversed.length - i}.</td><td><span>${
          numsReversed[i]
        }</span> x <span>8<sup>${i}</sup></span></td><td>${i}</td></tr>`;
        paraContent += `<span class="n">${numsReversed[i]}</span> x <span>8<sup>${i}</sup></span>`;
        if (i !== 0) {
          paraContent += " + ";
        }
        if (i == 0) {
          paraContent += `<p class="cal-2">`;
        }
      }
      for (let j = 0; j < calData.length; j++) {
        paraContent += `<span>${calData[j]}</span>`;
        if (j !== calData.length - 1) {
          paraContent += " + ";
        }
      }
      tableContent += "</table>";
      paraContent += ` = &nbsp;<span>${decimalResult}</span></p>
      <p class="cal-3">(${nums.join(
        ""
      )})<sub>8</sub> = (${decimalResult})<sub>10</sub></p></div></div>`;
      if (value.length > 1) {
        filteredContent = `  
          ${tableContent}
          <p class="head pad">Solution:</p>
          ${paraContent}`;
      } else {
        filteredContent = `<p class="message">No Need To Conversion Steps</p>`;
      }
      result5.innerHTML = `
        <p class="numbers">${coloredDecimalResult.join("")}</p>
        <div class="table-container">
         <p class="head">Octal Digit:</p>
          <div class="number">${nums.join("")}</div>
        <p class="head pad">In Decimal Conversion:</p>
        <div class="number">${decimalResult}</div>
      </div>
    <div class="table-container">
        <p class="head">Conversion in base:</p>
        <div class="base">
          <p>(${nums.join(
            ""
          )})<sub>8</sub> = (${decimalResult})<sub>10</sub></p>
        </div>
      </div>
     <div class="table-container">
        <p class="head">Conversion Steps:</p>
        ${filteredContent}
      </div>`;
    }
  } else {
    result5.innerHTML = "";
  }
}

input5.addEventListener("input", octaToDecimal);

//---------------------- decimal to hexal -------------------

const input6 = document.getElementById("input6");
const result6 = document.getElementById("result6");

function extractHexa(n) {
  const hexArrayColor = [];
  const hexArray = [];
  const remData = [];
  const quoData = [];
  const divData = [];
  const dataCount = [];

  if (n == 0) {
    hexArrayColor.push(0);
    hexArray.push(0);
    divData.push(0);
    remData.push(0);
    quoData.push(0);
  } else {
    while (n > 0) {
      let rem = n % 16;
      if (rem < 10) {
        hexArrayColor.push(`<span class="one-c">${rem}</span>`);
        hexArray.push(rem);
      } else {
        let hexChar = String.fromCharCode(55 + rem);
        hexArrayColor.push(`<span class="zero-c">${hexChar}</span>`);
        hexArray.push(hexChar);
      }
      remData.push(rem);
      quoData.push(n);
      divData.push(16);
      n = Math.floor(n / 16);
    }
  }
  const hexArrayReversed = hexArray.reverse().join("");
  const hexArrayColorReversed = hexArrayColor.reverse().join("");
  divData.pop();
  remData.pop();
  divData.filter((e, i) => dataCount.push(i + 1 + "."));
  divData.push("");
  remData.push("");
  dataCount.push("");
  return {
    hexArrayReversed,
    hexArrayColorReversed,
    divData,
    quoData,
    remData,
    dataCount,
  };
}

function decimalToHexa() {
  const value = input6.value;
  const nums = parseInt(Number(value));
  input6.value = value;

  if (value.length > 0) {
    const {
      hexArrayReversed,
      hexArrayColorReversed,
      divData,
      quoData,
      remData,
      dataCount,
    } = extractHexa(nums);
    const hexReversed = hexArrayReversed.split("");
    if (value == 0) {
      input6.value = "0";
    } else {
      input6.value = nums;
    }
    let tableContent =
      "<table><tr><th>Step</th><th>Divisor</th><th>Quotient</th><th>Remainder</th></tr>";
    for (let i = 0; i < remData.length; i++) {
      tableContent += `<tr><td>${dataCount[i]}</td><td>${divData[i]}</td><td>${quoData[i]}</td>
      <td>${remData[i]}</td></tr>`;
    }
    tableContent += "</table>";
    const showHexWithNum = [];
    let filteredContent = "";
    let chartContent = "";
    let flag = false;
    remData.reverse().shift();

    remData.find((e, i) => {
      if ([10, 11, 12, 15, 14, 15].includes(e)) {
        chartContent = `
          <div class="table-container">
            <p class="head">Chart:</p>
            <table>
              <tr><th>Decimal</th><th>In Hexadecimal</th></tr>
              <tr><td>10</td><td>A</td></tr>
              <tr><td>11</td><td>B</td></tr>
              <tr><td>12</td><td>C</td></tr>
              <tr><td>13</td><td>D</td></tr>
              <tr><td>14</td><td>E</td></tr>
              <tr><td>15</td><td>F</td></tr>
            </table>
          </div>`;

        flag = true;
        switch (e) {
          case 10:
            showHexWithNum.push(
              `&nbsp;<span class="rem-no">${e}=A</span>&nbsp;`
            );
            break;
          case 11:
            showHexWithNum.push(
              `&nbsp;<span class="rem-no">${e}=B</span>&nbsp;`
            );
            break;
          case 12:
            showHexWithNum.push(
              `&nbsp;<span class="rem-no">${e}=C</span>&nbsp;`
            );
            break;
          case 13:
            showHexWithNum.push(
              `&nbsp;<span class="rem-no">${e}=D</span>&nbsp;`
            );
            break;
          case 14:
            showHexWithNum.push(
              `&nbsp;<span class="rem-no">${e}=E</span>&nbsp;`
            );
            break;
          case 15:
            showHexWithNum.push(
              `&nbsp;<span class="rem-no">${e}=F</span>&nbsp;`
            );
            break;
          default:
            showHexWithNum.push(" ");
        }
      } else {
        showHexWithNum.push(`&nbsp;<span class="rem-no-1">${e}</span>&nbsp;`);
      }
      if (i == remData.length - 1 && flag) {
        showHexWithNum.push(" follow chart value mentioned above");
      }
    });

    if (nums > 15) {
      filteredContent = `
        ${tableContent}
         <p class="show-num"> Represent as last quotient <b>${
           quoData[quoData.length - 1]
         }</b> and remainder ${showHexWithNum.join("")} like this : 
         <span class="s-n">${hexArrayReversed}</span></p>`;
    } else {
      filteredContent = `<p class="message">No Need to Conversion Steps</p>`;
    }
    result6.innerHTML = `
      <div class="numbers">${hexArrayColorReversed}</div>
       <div class="table-container">
         <p class="head">Decimal Digit:</p>
          <div class="number">${nums}</div>
        <p class="head pad">In hex Conversion:</p>
        <div class="number">${hexArrayReversed}</div>
      </div>
      ${chartContent}
      <div class="table-container">
        <p class="head">Conversion Steps:</p>
        ${filteredContent}
      </div>`;
  } else {
    result6.innerHTML = "";
  }
}

input6.addEventListener("input", decimalToHexa);

//-----------------------hexal to decimal ----------------------

const input7 = document.getElementById("input7");
const result7 = document.getElementById("result7");

function extractHexaDecimal(nums) {
  let deciNum = 0;
  const calData = [];

  for (let i = nums.length - 1; i >= 0; i--) {
    const value = parseInt(nums[nums.length - 1 - i], 16);
    const calculation = value * Math.pow(16, i);
    deciNum += calculation;
    calData.push(calculation);
  }

  let coloredDeciNum = [];
  [deciNum]
    .join("")
    .split("")
    .forEach((e) => {
      if (e == 0) {
        coloredDeciNum.push(`<span class="zero-c">${e}</span>`);
      } else {
        coloredDeciNum.push(`<span class="one-c">${e}</span>`);
      }
    });

  return { deciNum, coloredDeciNum, calData };
}

function HexaToDecimal() {
  const value = input7.value.trim();
  const nums = value
    .toUpperCase()
    .split("")
    .filter((e) => /[0-9A-F]/.test(e));

  if (nums.length >= 2 && nums[0] === "0") {
    nums.shift();
  }

  input7.value = nums.join("");

  if (nums.length > 0) {
    const data = extractHexaDecimal(nums);
    const coloredDecimalResult = data.coloredDeciNum;
    const decimalResult = data.deciNum;
    const calData = data.calData;
    const numsReversed = nums
      .map((e) => extractHexaDecimal(e).deciNum)
      .reverse();

    let chartContent = "";
    let filteredContent = "";
    numsReversed.find((e) => {
      if ([10, 11, 12, 13, 14, 15].includes(e)) {
        chartContent = `
          <div class="table-container">
            <p class="head">Chart:</p>
            <table>
              <tr><th>Hexadecimal</th><th>In Decimal</th></tr>
              <tr><td>A</td><td>10</td></tr>
              <tr><td>B</td><td>11</td></tr>
              <tr><td>C</td><td>12</td></tr>
              <tr><td>D</td><td>13</td></tr>
              <tr><td>E</td><td>14</td></tr>
              <tr><td>F</td><td>15</td></tr>
            </table>
          </div>`;
      }
    });

    let tableContent =
      "<table><tr><th>Sno</th><th>Conversion</th><th>Power</th></tr>";
    let paraContent = `<div class="solve"><p class="num">${nums.join(
      ""
    )}</p><div class="cal-con"><p class="cal">`;

    for (let i = numsReversed.length - 1; i >= 0; i--) {
      tableContent += `<tr><td>${numsReversed.length - i}.</td><td><span>${
        numsReversed[i]
      }</span> x <span>16<sup>${i}</sup></span></td><td>${i}</td></tr>`;
      paraContent += `<span class="n">${numsReversed[i]}</span> x <span>16<sup>${i}</sup></span>`;
      if (i !== 0) {
        paraContent += " + ";
      }
      if (i === 0) {
        paraContent += `<p class="cal-2">`;
      }
    }

    for (let j = 0; j < calData.length; j++) {
      paraContent += `<span>${calData[j]}</span>`;
      if (j !== calData.length - 1) {
        paraContent += " + ";
      }
    }

    tableContent += "</table>";
    paraContent += `</p><p class="cal-2"><b>${decimalResult}</b></p>
      <p class="cal-3">(${nums.join(
        ""
      )})<sub>16</sub> = (${decimalResult})<sub>10</sub></p></div></div>`;

    if (value.length > 1) {
      filteredContent = ` 
            ${tableContent}
            <p class="head pad">Solution:</p>
            ${paraContent}`;
    } else {
      filteredContent = `<p class="message">No Need To Conversion Steps</p>`;
    }
    result7.innerHTML = `
      <p class="numbers">${coloredDecimalResult.join("")}</p> 
      <div class="table-container">
        <p class="head">Hexadecimal:</p>
        <div class="number">${nums.join("")}</div>
        <p class="head pad">In Decimal Conversion:</p>
        <div class="number">${decimalResult}</div>
      </div>
      <div class="table-container">
        <p class="head">Conversion in base:</p>
        <div class="base">
          <p>(${nums.join(
            ""
          )})<sub>16</sub> = (${decimalResult})<sub>10</sub></p>
        </div>
      </div>
        ${chartContent}
      <div class="table-container">
        <p class="head">Conversion Steps:</p>
        ${filteredContent}
      </div>`;
  } else {
    result7.innerHTML = "";
  }
}

input7.addEventListener("input", HexaToDecimal);

//-------------------- octal to hexal -------------------

const input8 = document.getElementById("input8");
const result8 = document.getElementById("result8");

function extractOctaToHexa(nums) {
  const decimalValue = extractOctaDecimal(nums).deciNum;
  const coloredHexValue = extractHexa(decimalValue).hexArrayColorReversed;
  const hexValue = extractHexa(decimalValue).hexArrayReversed;
  return { coloredHexValue, hexValue };
}

function octaToHexa() {
  const value = input8.value;
  const nums = value.split("").filter((e) => e >= "0" && e <= "7");

  if (nums.length >= 2 && nums[0] == 0) {
    nums.shift();
  }
  input8.value = nums.join("");
  const { coloredHexValue, hexValue } = extractOctaToHexa(nums);
  const arrHexValue = [hexValue].join("").split("");
  const octSpace = formateNumsSpace(nums).numsDecimalfillSpace;
  const octBinaryExtract = nums.map((e) => extractBinary(e).binArrayReversed);
  const setofThree = octBinaryExtract.map((e) =>
    formatZero(e, 3).newformattedHtml.join("")
  );
  const setofThree2 = octBinaryExtract.map((e) =>
    formatZero(e, 3).formattedArray.join("")
  );
  const setOfThreeSpace = formateNumsSpace(setofThree).numsDecimalfillSpace;
  const setOfFour = formatZero(setofThree2.join(""), 4);
  const { numsDecimalfill, numsDecimalfillSpace } =
    formateNumsSpace(arrHexValue);

  let chartContent = "";
  let filteredContent = "";
  arrHexValue.find((e) => {
    if (["A", "B", "C", "D", "E", "F"].includes(e)) {
      chartContent = `
          <div class="table-container">
            <p class="head">Chart:</p>
            <table>
              <tr><th>Decimal</th><th>In Hexadecimal</th><th>Octal</th><th>In Hexdecimal</th></tr>
              <tr><td>10</td><td>A</td><td>12</td><td>A</td></tr>
              <tr><td>11</td><td>B</td><td>13</td><td>B</td></tr>
              <tr><td>12</td><td>C</td><td>14</td><td>C</td></tr>
              <tr><td>13</td><td>D</td><td>15</td><td>D</td></tr>
              <tr><td>14</td><td>E</td><td>16</td><td>E</td></tr>
              <tr><td>15</td><td>F</td><td>17</td><td>F</td></tr>
            </table>
          </div>`;
      if (value.length > 2) {
        filteredContent = `
          <div class="solve">    
            <p class="num-head">1. Octal Digits:</p>
            <p class="num">${nums.join("")}</p>
            <div class="cal-con">
              <div class="cal-head">2. Split Octal Digits:</div>
              <div class="cal">${octSpace}</div>
              <div class="cal-head">3. Convert Each into Binary Digits Sets of Three, Add Zero if Not in Sets of Three:</div>
              <div class="cal">${setOfThreeSpace}</div>
              <div class="cal-head">4. Combine Binary Digits:</div>
              <div class="cal">${setofThree2.join("")}</div>
              <div class="cal-head">5. Group Binary into Sets of Four:</div>
              <div class="cal">${setOfFour.newformattedHtml.join("")}</div>
              <div class="cal-head">6. Convert Each Group to Decimal:</div>
              <div class="cal-2">${numsDecimalfill}</div>
              <div class="cal-head">7. Replace Decimal Digits, if Greater Than 9 to its Hexadecimal Character Follow Chart Above:</div>
              <div class="cal-2">${numsDecimalfillSpace}</div>
              <div class="cal-head">8. Now Combine the Hexadecimal Digits:</div>
              <div class="cal-2"><b>${hexValue}</b></div>
              <div class="cal-head">9. Conversion in base:</div>
              <div class="cal-3">(${nums.join(
                ""
              )})<sub>8</sub> = (${hexValue})<sub>16</sub></div>
            </div>
          </div>  `;
      } else {
        filteredContent = `
          <div class="solve">  
            <p class="num-head">1. Octal Digits:</p>
            <p class="num">${nums.join("")}</p>
            <div class="cal-con">
              <div class="cal-head">2. Split Octal Digits:</div>
              <div class="cal">${octSpace}</div>
              <div class="cal-head">3. Convert Each into Binary Digits Sets of Three, Add Zero if Not in Sets of Three:</div>
              <div class="cal">${setOfThreeSpace}</div>
              <div class="cal-head">4. Combine Binary Digits:</div>
              <div class="cal">${setofThree2.join("")}</div>
              <div class="cal-head">5. Group Binary into Sets of Four:</div>
              <div class="cal">${setOfFour.newformattedHtml.join("")}</div>
              <div class="cal-head">6. Convert Each Group to Decimal:</div>
              <div class="cal-2">${numsDecimalfill}</div>
              <div class="cal-head">7. Replace Decimal Digits, if Greater Than 9 to its Hexadecimal Character Follow Chart Above:</div>
              <div class="cal-2">${numsDecimalfillSpace}</div>
              <div class="cal-head">8. Conversion in base:</div>
              <div class="cal-3">(${nums.join(
                ""
              )})<sub>8</sub> = (${hexValue})<sub>16</sub></div>
            </div>
          </div>  `;
      }
    } else {
      if (value.length > 1) {
        if (value > 11) {
          filteredContent = `
            <div class="solve">
              <p class="num-head">1. Octal Digits:</p>
              <p class="num">${nums.join("")}</p>
              <div class="cal-con">
                <div class="cal-head">2. Split Octal Digits:</div>
                <div class="cal">${octSpace}</div>
                <div class="cal-head">3. Convert Each into Binary Digits Sets of Three, Add Zero if Not in Sets of Three:</div>
                <div class="cal">${setOfThreeSpace}</div>
                <div class="cal-head">4. Combine Binary Digits:</div>
                <div class="cal">${setofThree2.join("")}</div>
                <div class="cal-head">5. Group Binary into Sets of Four:</div>
                <div class="cal">${setOfFour.newformattedHtml.join("")}</div>
                <div class="cal-head">6. Convert Each Group to Decimal:</div>
                <div class="cal-2">${numsDecimalfill}</div>
                <div class="cal-head">8. Now Combine the Hexadecimal Digits:</div>
                <div class="cal-2"><b>${hexValue}</b></div>
                <div class="cal-head">9. Conversion in base:</div>
                <div class="cal-3">(${nums.join(
                  ""
                )})<sub>8</sub> = (${hexValue})<sub>16</sub></div>
              </div>
            </div>   `;
        } else {
          filteredContent = `
            <div class="solve">
              <p class="num-head">1. Octal Digits:</p>
              <p class="num">${nums.join("")}</p>
              <div class="cal-con">
                <div class="cal-head">2. Split Octal Digits:</div>
                <div class="cal">${octSpace}</div>
                <div class="cal-head">3. Convert Each into Binary Digits Sets of Three, Add Zero if Not in Sets of Three:</div>
                <div class="cal">${setOfThreeSpace}</div>
                <div class="cal-head">4. Combine Binary Digits:</div>
                <div class="cal">${setofThree2.join("")}</div>
                <div class="cal-head">5. Group Binary into Sets of Four:</div>
                <div class="cal">${setOfFour.newformattedHtml.join("")}</div>
                <div class="cal-head">6. Convert Each Group to Hexadecimal Digits:</div>
                <div class="cal-2">${numsDecimalfill}</div>
                <div class="cal-head">9. Conversion in base:</div>
                <div class="cal-3">(${nums.join(
                  ""
                )})<sub>8</sub> = (${hexValue})<sub>16</sub></div>
              </div>
            </div>   `;
        }
      } else {
        filteredContent = `
        <p class="message">No Need To Conversion Steps</p>`;
      }
    }
  });

  if (value.length > 0) {
    if (value >= 8) {
      result8.innerHTML = `
        <div class="table-container">
            <p class="message">Enter number combination less than 8:</p>
        </div>`;
    }

    if (nums.length !== 0) {
      result8.innerHTML = `
    <div class="numbers">${coloredHexValue}</div>
    <div class="table-container">
     <p class="head">Octal Digit:</p>
      <div class="number">${nums.join("")}</div>
     <p class="head pad">In Hexa decimal Conversion:
      <div class="number">${hexValue}</div>
    </div>
    <div class="table-container">
     <p class="head">Conversion in base:</p>
    <div class="base">
    <p>(${nums.join("")})<sub>8</sub> = (${hexValue})<sub>16</sub></p>
    </div>
    </div>
     ${chartContent}
   <div class="table-container">
      <p class="head">Conversion Steps:</p>
      ${filteredContent}
      </div>
    </div>`;
    }
  } else {
    result8.innerHTML = "";
  }
}

input8.addEventListener("input", octaToHexa);

//--------------------- hexal to octal ------------------------

const input9 = document.getElementById("input9");
const result9 = document.getElementById("result9");

function extractHexaToOcta(nums) {
  const decimalValue = extractHexaDecimal(nums).deciNum;
  const octReversed = extractOcta(decimalValue).octArrayReversed;
  const octReversedColor = extractOcta(decimalValue).octArrayColorReversed;
  return { octReversed, octReversedColor };
}

function HexaToOcta() {
  const value = input9.value;
  const nums = value
    .toString()
    .toUpperCase()
    .split("")
    .filter((e) => /[0-9A-Fa-f]/.test(e));
  if (nums.length >= 2 && nums[0] == 0) {
    nums.shift();
  }
  input9.value = nums.join("");
  const { octReversed, octReversedColor } = extractHexaToOcta(nums);
  const arrOctValue = [octReversed].join("").split("");
  const hexSpace = formateNumsSpace(nums).numsDecimalfillSpace;
  const hexCharToDeci = [extractHexaDecimal(nums.join("")).deciNum].slice("");
  const hexBinaryExtract = hexCharToDeci.map(
    (e) => extractBinary(e).binArrayReversed
  );
  const setOfFour = hexBinaryExtract.map((e) =>
    formatZero(e, 4).newformattedHtml.join("")
  );
  const setOfFour2 = hexBinaryExtract.map((e) =>
    formatZero(e, 4).formattedArray.join("")
  );
  const setOfThreeSpace = formateNumsSpace(setOfFour).numsDecimalfillSpace;
  const setOfThree = formatZero(setOfFour2.join(""), 3);
  const { numsDecimalfillSpace } = formateNumsSpace(arrOctValue);
  let chartContent = "";
  let filteredContent = "";
  nums.find((e) => {
    if (["A", "B", "C", "D", "E", "F"].includes(e)) {
      chartContent = `
          <div class="table-container">
            <p class="head">Chart:</p>
            <table>
              <tr><th>Hexadecimal</th><th>In Binary</th><th>In Decimal</th><th>In Octal</th></tr>
              <tr><td>A</td><td>1010</td><td>10</td><td>12</td></tr>
              <tr><td>B</td><td>1011</td><td>11</td><td>13</td></tr>
              <tr><td>C</td><td>1100</td><td>12</td><td>14</td></tr>
              <tr><td>D</td><td>1101</td><td>13</td><td>15</td></tr>
              <tr><td>E</td><td>1110</td><td>14</td><td>16</td></tr>
              <tr><td>F</td><td>1111</td><td>15</td><td>17</td></tr>
            </table>
          </div>`;
    }
  });

  if (hexCharToDeci.join("") > 15) {
    filteredContent = `
      <div class="solve">   
        <p class="num-head">1. Hexadecimal Digit:</p>
        <p class="num">${nums.join("")}</p>
        <div class="cal-con">
          <p class="cal-head">2. Split Hexadecimal Digits:</p>
          <p class="cal">${hexSpace}</p>
          <p class="cal-head">3. Convert Each into Binary Digits Sets of Four, Add Zero if Not in Sets of Four:</p>
          <p class="cal">${setOfThreeSpace}</p>
          <p class="cal-head">4. Combine Binary Digits:</p>
          <p class="cal">${setOfFour2.join("")}</p>
          <p class="cal-head">5. Group Binary into Sets of Three:</p>
          <p class="cal">${setOfThree.newformattedHtml.join("")}</p>
          <p class="cal-head">6. Convert Each Binary Group to Decimal:</p>
          <p class="cal-2">${numsDecimalfillSpace}</p>
          <p class="cal-head">7. Now Combine the Octal Digits:</p>
          <p class="cal-2"><b>${octReversed}</b></p>
          <p class="cal-head">8. Conversion in base:</p>
          <p class="cal-3">(${nums.join(
            ""
          )})<sub>16</sub> = (${octReversed})<sub>8</sub></p>
        </div>
      </div>  `;
  } else if (hexCharToDeci.join() > 7) {
    filteredContent = `
      <div class="solve">  
        <p class="num-head">1. Hexadecimal Digit:</p>
        <p class="num">${nums.join("")}</p>
        <div class="cal-con">
          <p class="cal-head">2. Convert Each into Binary Digits Sets of Four, Add Zero if Not in Sets of Four:</p>
          <p class="cal">${setOfThreeSpace}</p>
          <p class="cal-head">3. Group Binary into Sets of Three:</p>
          <p class="cal">${setOfThree.newformattedHtml.join("")}</p>
          <p class="cal-head">4. Convert Each Binary Group to Decimal:</p>
          <p class="cal-2">${numsDecimalfillSpace}</p>
          <p class="cal-head">5. Now Combine the Octal Digits:</p>
          <p class="cal-2"><b>${octReversed}</b></p>
          <p class="cal-head">6. Conversion in base:</p>
          <p class="cal-3">(${nums.join(
            ""
          )})<sub>16</sub> = (${octReversed})<sub>8</sub></p>
        </div>
      </div>  `;
  } else {
    filteredContent = `
      <p class="message">No Need To Conversion Steps</p>`;
  }

  if (value.length > 0) {
    if (value >= 16) {
      result8.innerHTML = `
        <div class="table-container">
            <p class="message">Enter number combination less than 16:</p>
        </div>
        `;
    }

    if (nums.length !== 0) {
      result9.innerHTML = `
    <div class="numbers">${octReversedColor}</div>
    <div class="table-container">
     <p class="head">Hexadecimal Digit:</p>
      <div class="number">${nums.join("")}</div>
     <p class="head pad">In octal Conversion:
      <div class="number">${octReversed}</div>
    </div>
    <div class="table-container">
     <p class="head">Conversion in base:</p>
    <div class="base">
    <p>(${nums.join("")})<sub>16</sub> = (${octReversed})<sub>8</sub></p>
    </div>
    </div>
     ${chartContent}
   <div class="table-container">
      <p class="head">Conversion Steps:</p>
      ${filteredContent}
    </div>`;
    }
  } else {
    result9.innerHTML = "";
  }
}

input9.addEventListener("input", HexaToOcta);

//-------------------------- binary to octal ---------------------

const input10 = document.getElementById("input10");
const result10 = document.getElementById("result10");

function binaryToOcta() {
  const value = input10.value;
  let nums = value.split("").filter((e) => e == "0" || e == "1");
  if (nums.length >= 2 && nums[0] == 0) {
    nums.shift();
  }
  input10.value = nums.join("");

  if (value.length > 0) {
    if (value >= 2) {
      result10.innerHTML = `<div class="table-container">
        <p class="message">Enter number combination of 0 and 1:</p>
      </div>`;
    }
    if (nums.length !== 0) {
      const decimalValue = extractDecimal(nums).deciNum;
      const { octArrayColorReversed, octArrayReversed } =
        extractOcta(decimalValue);
      const arrayOcta = [octArrayReversed].join("").split("");
      const newNums = nums.join("");
      const setOfThree = formatZero(newNums, 3).newformattedHtml;
      const { numsDecimalfillSpace } = formateNumsSpace(arrayOcta);
      let filteredContent = "";
      if (value.length > 3) {
        filteredContent = `
        <div class="solve">
          <p class="num-head">1. Binary Digit:</p>
          <p class="num">${nums.join("")}</p>
          <div class="cal-con">
            <p class="cal-head">2. Group Binary Digits into Sets of Three:</p>
            <p class="cal">${setOfThree.join("")}</p>
            <p class="cal-head">3. Write Each Group to Decimal:</p>
            <p class="cal-2">${numsDecimalfillSpace}</p>
            <p class="cal-head">4. Now Combine the Decimal Digits to Get Octal Digit:</p>
            <p class="cal-2"><b>${arrayOcta.join("")}</b></p>
            <p class="cal-head">5. Conversion in base:</p>
            <p class="cal-3">(${nums.join(
              ""
            )})<sub>2</sub> = (${octArrayReversed})<sub>8</sub></p>
          </div>
        </div>`;
      } else {
        filteredContent = `<p class="message">No Need To Conversion Steps</p>`;
      }

      result10.innerHTML = `
    <p class="numbers">${octArrayColorReversed}</p>
    <div class="table-container">
      <p class="head">Binary Digits:</p>
      <div class="number">${nums.join("")}</div>
      <p class="head pad">In Octal Conversion:</p>
      <div class="number"> ${octArrayReversed}</div>
      </div>
    <div class="table-container">
      <p class="head">Conversion in base:</p>
      <div class="base">
      <p>(${nums.join("")})<sub>2</sub> = (${octArrayReversed})<sub>8</sub></p>
      </div>
    </div>
    <div class="table-container">
      <p class="head">Conversion Steps:</p>
      ${filteredContent}
    </div>`;
    }
  } else {
    result10.innerHTML = "";
  }
}

input10.addEventListener("input", binaryToOcta);

//--------------------- octal to binary --------------------

const input11 = document.getElementById("input11");
const result11 = document.getElementById("result11");

function octaToBinary() {
  const value = input11.value;
  const nums = value.split("").filter((e) => e >= "0" && e <= "7");
  if (nums.length >= 2 && nums[0] == 0) {
    nums.shift();
  }
  input11.value = nums.join("");

  if (value.length > 0) {
    if (value >= 8) {
      result11.innerHTML = `<div class="table-container">
         <p class="message">Enter number combination less than 8:</p>
      </div>`;
    }
    if (nums.length !== 0) {
      const decimalValue = extractOctaDecimal(nums).deciNum;
      const { binArrayReversed, binArrayColorReversed } =
        extractBinary(decimalValue);
      const octInSpace = formateNumsSpace(nums).numsDecimalfillSpace;
      const extractBinaryOfSplit = nums
        .map((e) => extractBinary(e).binArrayReversed)
        .map((e) => formatZero(e, 3).newformattedHtml.join(""));

      const extractBinaryOfSplitSpace =
        formateNumsSpace(extractBinaryOfSplit).numsDecimalfillSpace;

      let filteredContent = "";
      if (value.length > 1) {
        filteredContent = `
            <div class="solve">
              <p class="num-head">1. Octal Digit:</p>
              <p class="num">${nums.join("")}</p>
              <div class="cal-con">
                <p class="cal-head">2. Split Octal Digits:</p>
                <p class="cal">${octInSpace}</p>
                <p class="cal-head">3. Convert Decimal Digits to Binary in Sets of Three, if Not in Sets of Three, Add Extra Zero to Make Sets of Three:</p>
                <p class="cal">${extractBinaryOfSplitSpace}</p>
                <p class="cal-head">4. Now Combine the Binary Digits:</p>
                <p class="cal-2"><b>${binArrayReversed}</b></p>
                <p class="cal-head">5. Conversion in base:</p>
                <p class="cal-3">(${nums.join(
                  ""
                )})<sub>8</sub> = (${binArrayReversed})<sub>2</sub></p>
                 </div>
              </div>
            </div>`;
      } else {
        filteredContent = `
              <p class="message">No Need To Conversion Steps</p>`;
      }
      result11.innerHTML = `
     <p class="numbers">${binArrayColorReversed}</p>
    <div class="table-container">
      <p class="head">Hexa decimal:</p>
      <div class="number">${nums.join("")}</div>
        <p class="head pad">In Binary Digit:</p>
      <div class="number">${binArrayReversed}</div>
    </div>
    <div class="table-container">
      <p class="head">Conversion in base:</p>
      <div class="base">
        <p>(${nums.join(
          ""
        )})<sub>8</sub> = (${binArrayReversed})<sub>2</sub></p>
      </div>
    </div>
    <div class="table-container">
      <p class="head">Conversion Steps:</p>
      ${filteredContent}
    </div>`;
    }
  } else {
    result11.innerHTML = "";
  }
}

input11.addEventListener("input", octaToBinary);

//-------------------- binary to hexal ---------------------------

const input12 = document.getElementById("input12");
const result12 = document.getElementById("result12");

function binaryToHexa() {
  const value = input12.value;
  let nums = value.split("").filter((e) => e == "0" || e == "1");
  if (nums.length >= 2 && nums[0] == 0) {
    nums.shift();
  }
  input12.value = nums.join("");

  if (value.length > 0) {
    if (value >= 2) {
      result12.innerHTML = `<div class="table-container">
        <p class="message">Enter number combination of 0 and 1:</p>
      </div>`;
    }
    if (nums.length !== 0) {
      const decimalValue = extractDecimal(nums).deciNum;
      const { hexArrayColorReversed, hexArrayReversed } =
        extractHexa(decimalValue);
      const arrayhex = [hexArrayReversed].join("").split("");
      const newNums = nums.join("");
      const setOfFour = formatZero(newNums, 4).newformattedHtml;
      const { numsDecimalfill, numsDecimalfillSpace } =
        formateNumsSpace(arrayhex);

      let chartContent = "";
      let filteredContent = "";
      arrayhex.find((e) => {
        if (["A", "B", "C", "D", "E", "F"].includes(e)) {
          chartContent = `
          <div class="table-container">
            <p class="head">Chart:</p>
            <table>
              <tr><th>Hexadecimal</th><th>In Binary</th><th>In Decimal</th></tr>
              <tr><td>A</td><td>1010</td><td>10</td></tr>
              <tr><td>B</td><td>1011</td><td>11</td></tr>
              <tr><td>C</td><td>1100</td><td>12</td></tr>
              <tr><td>D</td><td>1101</td><td>13</td></tr>
              <tr><td>E</td><td>1110</td><td>14</td></tr>
              <tr><td>F</td><td>1111</td><td>15</td></tr>
            </table>
          </div>`;
          if (value.length > 4) {
            filteredContent = ` 
            <div class="solve">
              <p class="num-head">1. Binary Digit:</p>
              <p class="num">${nums.join("")}</p>
              <div class="cal-con"> 
                <p class="cal-head">2. Group Binary Digits into Sets of Four:</p>
                <p class="cal">${setOfFour.join("")}</p>
                <p class="cal-head">3. Convert Each Binary Group to Decimal:</p>
                <p class="cal-2">${numsDecimalfill}</p>
                <p class="cal-head">4. Replace Decimal Digits, if Greater Than 10 to its Hexadecimal Character Follow Chart Above:</p>
                <p class="cal-2">${numsDecimalfillSpace}</p>
                <p class="cal-head">5. Now Combine the Hexadecimal Digits:</p>
                <p class="cal-2"><b>${arrayhex.join("")}</b></p>
                <p class="cal-head">6. Conversion in base:</p>
                <p class="cal-3">(${nums.join(
                  ""
                )})<sub>2</sub> = (${hexArrayReversed})<sub>16</sub></p>
              </div>
            </div>`;
          } else {
            filteredContent = `<p class="message">No Need to Conversion Steps</p>`;
          }
        } else {
          if (value.length > 4) {
            filteredContent = ` 
             <div class="solve">
              <p class="num-head">1. Binary Digit:</p>
              <p class="num">${nums.join("")}</p>
              <div class="cal-con">     
                <p class="cal-head">2. Group Binary Digits into Sets of Four:</p>
                <p class="cal">${setOfFour.join("")}</p>
                <p class="cal-head">4. Convert Each Binary Group to Decimal:</p>
                <p class="cal-2">${numsDecimalfillSpace}</p>
                <p class="cal-head">5. Now Combine the Decimal Digits:</p>
                <p class="cal-2"><b>${arrayhex.join("")}</b></p>
                <p class="cal-head">6. Conversion in base:</p>
                <p class="cal-3">(${nums.join(
                  ""
                )})<sub>2</sub> = (${hexArrayReversed})<sub>16</sub></p>
              </div>
            </div>`;
          } else {
            filteredContent = `<p class="message">No Need to Conversion Steps</p>`;
          }
        }
      });

      result12.innerHTML = `
    <p class="numbers">${hexArrayColorReversed}</p>
    <div class="table-container">
      <p class="head">Binary Number:</p>
      <div class="number">${nums.join("")}</div>
      <p class="head pad">In hex Conversion:</p>
      <div class="number"> ${hexArrayReversed}</div>
      </div>
    <div class="table-container">
      <p class="head">Conversion in base:</p>
      <div class="base">
      <p>(${nums.join("")})<sub>2</sub> = (${hexArrayReversed})<sub>16</sub></p>
      </div>
    </div>
    ${chartContent}
    <div class="table-container">
      <p class="head">Conversion Steps:</p>
      ${filteredContent}
    </div>`;
    }
  } else {
    result12.innerHTML = "";
  }
}

input12.addEventListener("input", binaryToHexa);

//-------------------- hexal to binary ------------------------

const input15 = document.getElementById("input15");
const result15 = document.getElementById("result15");

function HexaToBinary() {
  const value = input15.value;
  let nums = value
    .toString()
    .toUpperCase()
    .split("")
    .filter((e) => /[0-9A-Fa-f]/.test(e));
  if (nums.length >= 2 && nums[0] == 0) {
    nums.shift();
  }
  input15.value = nums.join("");

  if (value.length > 0) {
    if (nums.length !== 0) {
      const decimalValue = extractHexaDecimal(nums).deciNum;
      const { binArrayReversed, binArrayColorReversed } =
        extractBinary(decimalValue);
      const hexInSpace = formateNumsSpace(nums).numsDecimalfillSpace;
      const hexInDecimalFiltered = [];
      nums.forEach((e) => {
        switch (e) {
          case "A":
            hexInDecimalFiltered.push("10");
            break;
          case "B":
            hexInDecimalFiltered.push("11");
            break;
          case "C":
            hexInDecimalFiltered.push("12");
            break;
          case "D":
            hexInDecimalFiltered.push("13");
            break;
          case "E":
            hexInDecimalFiltered.push("14");
            break;
          case "F":
            hexInDecimalFiltered.push("15");
            break;
          default:
            hexInDecimalFiltered.push(e);
        }
      });

      const extractBinaryOfSplit = hexInDecimalFiltered
        .map((e) => extractBinary(e).binArrayReversed)
        .map((e) => formatZero(e, 4).newformattedHtml.join(""));
      const extractBinaryOfSplitSpace =
        formateNumsSpace(extractBinaryOfSplit).numsDecimalfillSpace;

      const hexInDecimalFilteredSpace =
        formateNumsSpace(hexInDecimalFiltered).numsDecimalfillSpace;
      let chartContent = "";
      let filteredContent = "";
      nums.find((e) => {
        if (["A", "B", "C", "D", "E", "F"].includes(e)) {
          chartContent = `
          <div class="table-container">
            <p class="head">Chart:</p>
            <table>
              <tr><th>Hex Value</th><th>In Binary</th><th>In Decimal</th></tr>
              <tr><td>A</td><td>1010</td><td>10</td></tr>
              <tr><td>B</td><td>1011</td><td>11</td></tr>
              <tr><td>C</td><td>1100</td><td>12</td></tr>
              <tr><td>D</td><td>1101</td><td>13</td></tr>
              <tr><td>E</td><td>1110</td><td>14</td></tr>
              <tr><td>F</td><td>1111</td><td>15</td></tr>
            </table>
          </div>`;
          if (value.length > 1) {
            filteredContent = `
            <div class="solve">
              <p class="num-head">1. Hexadecimal Digit:</p>
              <p class="num">${nums.join("")}</p>
              <div class="cal-con">    
                <p class="cal-head">2. Split Hexadecimal Digits:</p>
                <p class="cal">${hexInSpace}</p>
                <p class="cal-head">3. Write Down Decimal Digit Same as Above, Replace Only Hexadecimal Charater to its Decimal Digits Follow Chart Above:</p>
                <p class="cal">${hexInDecimalFilteredSpace}</p>
                <p class="cal-head">4. Convert Decimal Digits to Binary in Sets of Four, if Not in Sets of Four, Add Extra Zero to Make Sets of Four:</p>
                <p class="cal">${extractBinaryOfSplitSpace}</p>
                <p class="cal-head">5. Now Combine the Binary Digits:</p>
                <p class="cal-2"><b>${binArrayReversed}</b></p>
                <p class="cal-head">6. Conversion in base:</p>
                <p class="cal-3">(${nums.join(
                  ""
                )})<sub>16</sub> = (${binArrayReversed})<sub>2</sub></p>
                </div>
              </div>  
            </div>`;
          } else {
            filteredContent = `<p class="message">No Need to Conversion Steps</p>`;
          }
        } else {
          if (value.length > 1) {
            filteredContent = `
            <div class="solve">
              <p class="num-head">1. Hexadecimal Digit:</p>
              <p class="num">${nums.join("")}</p>
              <div class="cal-con">    
                <p class="cal-head">2. Split Hexadecimal Digits:</p>
                <p class="cal">${hexInSpace}</p>
                <p class="cal-head">3. Convert Decimal Digits to Binary in Sets of Four, if Not, Add Extra Zero to Make Sets of Four:</p>
                <p class="cal">${extractBinaryOfSplitSpace}</p>
                <p class="cal-head">4. Now Combine the Binary Digits:</p>
                <p class="cal-2"><b>${binArrayReversed}</b></p>
                <p class="cal-head">5. Conversion in base:</p>
                <p class="cal-3">(${nums.join(
                  ""
                )})<sub>16</sub> = (${binArrayReversed})<sub>2</sub></p>
                </div>
              </div>
            </div>`;
          } else {
            filteredContent = `<p class="message">No Need to Conversion Steps</p>`;
          }
        }
      });
      result15.innerHTML = `
    <p class="numbers">${binArrayColorReversed}</p>
    <div class="table-container">
      <p class="head">Hexa decimal:</p>
      <div class="number">${nums.join("")}</div>
        <p class="head pad">In Binary Digit:</p>
      <div class="number">${binArrayReversed}</div>
    </div>
    <div class="table-container">
      <p class="head">Conversion in base:</p>
      <div class="base">
        <p>(${nums.join(
          ""
        )})<sub>16</sub> = (${binArrayReversed})<sub>2</sub></p>
      </div>
    </div>
    ${chartContent}
     <div class="table-container">
      <p class="head">Conversion Steps:</p>
      ${filteredContent}
      </div>
    </div>`;
    }
  } else {
    result15.innerHTML = "";
  }
}

input15.addEventListener("input", HexaToBinary);
