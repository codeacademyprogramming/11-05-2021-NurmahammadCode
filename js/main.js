window.addEventListener("load", function () {
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  if (!isLoggedIn) {
    window.location.replace("login.html");
  } else {
    fetch("https://randomuser.me/api/")
      .then((response) => response.json())
      .then((jsonResponse) => {
        document.getElementById("profileImg").src =
          jsonResponse.results[0].picture.thumbnail;
        console.log(jsonResponse.results[0].name.first);
        document.getElementById("nameField").innerHTML =
          jsonResponse.results[0].name.first;
        document.getElementById("lastNameField").innerHTML =
          jsonResponse.results[0].name.last;
      });
  }
});

$.ajax({
  url: "https://api.npoint.io/ec21414b0e15972dbfde/data",
  type: "GET",
  dataType: "json",
  success: displayAll,
});

function displayAll(data) {
  if (data) {
    document.getElementById("customers").appendChild(makeUL(data));
    document
      .getElementsByTagName("ul")[0]
      .addEventListener("click", function (e) {
        if (e.target.nodeName != "LI") {
          document.getElementById("customer-modal").classList.remove("show");
          document.getElementById("customer-modal").innerHTML = "";

          document
            .getElementById("customer-modal")
            .appendChild(
              makeULForLoans(
                data.filter(
                  (item) =>
                    item.img ==
                    e.target.parentElement.getElementsByTagName("img")[0].src
                )[0].loans
                  ? data.filter(
                      (item) =>
                        item.img ==
                        e.target.parentElement.getElementsByTagName("img")[0]
                          .src
                    )[0].loans
                  : []
              )
            );
        }
        if (e.target && e.target.nodeName == "LI") {
          document.getElementById("customer-modal").classList.remove("show");
          document.getElementById("customer-modal").innerHTML = "";
          document
            .getElementById("customer-modal")
            .appendChild(
              makeULForLoans(
                data.filter(
                  (item) =>
                    item.img == e.target.getElementsByTagName("img")[0].src
                )[0].loans
                  ? data.filter(
                      (item) =>
                        item.img == e.target.getElementsByTagName("img")[0].src
                    )[0].loans
                  : []
              )
            );
        }
      });
  }
}

function makeULForLoans(object, filterTrue) {
  if (!filterTrue) window.value = object;
  if (filterTrue) {
    document.getElementById("customer-modal").innerHTML = "";
  }
  console.log(object);
  var list = document.createElement("ul");
  const buttonFilter = document.createElement("button");
  buttonFilter.innerHTML = "Aktivləri göstər";
  buttonFilter.className = "modalButton";
  var loans = object;
  buttonFilter.addEventListener("click", () => {
    document.getElementById("customer-modal").appendChild(
      makeULForLoans(
        object.filter((item) => item.closed == false),
        true
      )
    );
  });

  const buttonAll = document.createElement("button");
  buttonAll.innerHTML = "Hamısın göstər";
  buttonAll.className = "modalButton";
  var loans = object;
  buttonAll.addEventListener("click", () => {
    document
      .getElementById("customer-modal")
      .appendChild(makeULForLoans(window.value, true));
  });
  document.getElementById("customer-modal").appendChild(buttonFilter);
  document.getElementById("customer-modal").appendChild(buttonAll);
  var closeButton = document.createElement("span");
  closeButton.innerHTML = "X";
  closeButton.className = "close-button";
  closeButton.addEventListener("click", () => {
    list.innerHTML = "";
    document.getElementById("customer-modal").classList.add("show");
  });
  document.getElementById("customer-modal").appendChild(closeButton);

  for (var i = 0; i < loans.length; i++) {
    var item = document.createElement("li");

    var loaner = document.createElement("SPAN");
    loaner.id = "loaner";
    loaner.className = "loanFieldName";
    loaner.innerHTML = "Kredit verən: ";

    var amount = document.createElement("SPAN");
    amount.id = "amount";
    amount.className = "loanFieldName";
    amount.innerHTML = "Kreditin miqdarı: ";

    var isActive = document.createElement("SPAN");
    isActive.id = "isActive";
    isActive.className = "loanFieldName";
    isActive.innerHTML = "Kredit aktivdir mi? ";

    var monthlyPay = document.createElement("SPAN");
    monthlyPay.id = "monthlyPay";
    monthlyPay.className = "loanFieldName";
    monthlyPay.innerHTML = "Aylıq ödəniş: ";

    var dueAmount = document.createElement("SPAN");
    dueAmount.id = "dueAmount";
    dueAmount.className = "loanFieldName";
    dueAmount.innerHTML = "Qalan ödəniş: ";

    var startAndEndDate = document.createElement("SPAN");
    startAndEndDate.id = "startAndEndDate";
    startAndEndDate.className = "loanFieldName";
    startAndEndDate.innerHTML = "Başlama və bitmə tarixi: ";

    // Set its contents:
    item.appendChild(loaner);
    item.appendChild(
      document.createTextNode("\u00A0\u00A0" + loans[i].loaner + "\u00A0\u00A0")
    );
    item.appendChild(amount);
    item.appendChild(
      document.createTextNode(
        "\u00A0\u00A0" + loans[i].amount.value + "\u00A0\u00A0"
      )
    );
    item.appendChild(isActive);
    item.appendChild(
      loans[i].closed
        ? document.createTextNode("\u00A0\u00A0" + "Yox" + "\u00A0\u00A0")
        : document.createTextNode("\u00A0\u00A0" + "Hə" + "\u00A0\u00A0")
    );
    item.appendChild(monthlyPay);
    item.appendChild(
      document.createTextNode(
        "\u00A0\u00A0" + loans[i].perMonth?.value != undefined
          ? "\u00A0\u00A0" + loans[i].perMonth?.value + "\u00A0\u00A0"
          : "Bilinmir" + "\u00A0\u00A0"
      )
    );
    item.appendChild(dueAmount);
    item.appendChild(
      document.createTextNode(
        "\u00A0\u00A0" + loans[i].dueAmount.value + "\u00A0\u00A0"
      )
    );
    item.appendChild(startAndEndDate);
    item.appendChild(
      document.createTextNode(
        "\u00A0\u00A0" +
          loans[i].loanPeriod.start +
          "\u00A0\u00A0" +
          loans[i].loanPeriod.end +
          "\u00A0\u00A0"
      )
    );

    list.appendChild(item);
  }

  return list;
}

function makeUL(array, isSearch, isShowAll, name, surname) {
  if (!isSearch) window.customers = array;
  if (isSearch) {
    document.getElementById("customers").innerHTML = "";
  }
  var list = document.createElement("ul");
  const nameField = document.createElement("input");
  nameField.id = "nameField";
  nameField.placeholder = "Ad";
  nameField.className = "customerInput";
  const surnameField = document.createElement("input");
  surnameField.id = "surnameField";
  surnameField.placeholder = "Soyad";
  surnameField.className = "customerInput";
  document.getElementById("customers").appendChild(nameField);
  document.getElementById("customers").appendChild(surnameField);
  const searchButton = document.createElement("button");
  searchButton.id = "searchButton";
  searchButton.innerHTML = "Axtar";
  searchButton.className = "customerButton";
  document.getElementById("customers").appendChild(searchButton);

  const showAll = document.createElement("button");
  showAll.id = "showAll";
  showAll.className = "customerButton";
  showAll.innerHTML = "Hamısını göstər";
  document.getElementById("customers").appendChild(showAll);

  searchButton.addEventListener("click", () => {
    document
      .getElementById("customers")
      .appendChild(
        makeUL(
          window.customers,
          true,
          false,
          document.getElementById("nameField").value,
          document.getElementById("surnameField").value
        )
      );
  });

  showAll.addEventListener("click", () => {
    document
      .getElementById("customers")
      .appendChild(makeUL(window.customers, true, true, null, null));
  });

  for (var i = 0; i < array.length; i++) {
    if (isSearch && !isShowAll && (name || surname)) {
      if (array[i].name === name || array[i].surname === surname) {
        const loanArray = array[i].loans.filter((item) => item.closed == false);

        const sumLoanPerMonth = loanArray.reduce(
          (total, item) => total + item.perMonth.value,
          0
        );

        var item = document.createElement("li");
        item.id = array[i].img;

        var img = document.createElement("img");
        img.className = "customer-image";
        img.src = array[i].img;

        var name = document.createElement("SPAN");
        name.id = "customerName";
        name.className = "fieldName";
        name.innerHTML = "Ad: ";

        var surname = document.createElement("SPAN");
        surname.id = "customerSurname";
        surname.className = "fieldName";
        surname.innerHTML = "Soyad: ";

        var salary = document.createElement("SPAN");
        salary.id = "customerSalary";
        salary.className = "fieldName";
        salary.innerHTML = "Maaş: ";

        var hasLoan = document.createElement("SPAN");
        hasLoan.id = "customerLoan";
        hasLoan.className = "fieldName";
        hasLoan.innerHTML = "Aktiv krediti var mı? ";

        var oneMonthSum = document.createElement("SPAN");
        oneMonthSum.id = "customerSum";
        oneMonthSum.className = "fieldName";
        oneMonthSum.innerHTML = "Bir aylıq kredit ödənişi: ";

        item.appendChild(img);
        item.appendChild(name);
        item.appendChild(
          document.createTextNode(
            "\u00A0\u00A0" + array[i].name + "\u00A0\u00A0"
          )
        );
        item.appendChild(surname);
        item.appendChild(
          document.createTextNode(
            "\u00A0\u00A0" + array[i].surname + "\u00A0\u00A0"
          )
        );
        item.appendChild(salary);
        item.appendChild(
          document.createTextNode(
            "\u00A0\u00A0" + array[i].salary.value + "\u00A0\u00A0"
          )
        );
        item.appendChild(hasLoan);
        item.appendChild(
          document.createTextNode(
            "\u00A0\u00A0" + array[i].hasLoanHistory
              ? "\u00A0\u00A0" + "Var" + "\u00A0\u00A0"
              : "\u00A0\u00A0" + "Yox" + "\u00A0\u00A0"
          )
        );

        item.appendChild(oneMonthSum);
        item.appendChild(
          document.createTextNode(
            "\u00A0\u00A0" + sumLoanPerMonth + "\u00A0\u00A0"
          )
        );

        list.appendChild(item);
      }
    } else {
      const loanArray = array[i].loans.filter((item) => item.closed == false);

      const sumLoanPerMonth = loanArray.reduce(
        (total, item) => total + item.perMonth.value,
        0
      );

      var item = document.createElement("li");
      item.id = array[i].img;

      var img = document.createElement("img");
      img.className = "customer-image";
      img.src = array[i].img;

      var name = document.createElement("SPAN");
      name.id = "customerName";
      name.className = "fieldName";
      name.innerHTML = "Ad: ";

      var surname = document.createElement("SPAN");
      surname.id = "customerSurname";
      surname.className = "fieldName";
      surname.innerHTML = "Soyad: ";

      var salary = document.createElement("SPAN");
      salary.id = "customerSalary";
      salary.className = "fieldName";
      salary.innerHTML = "Maaş: ";

      var hasLoan = document.createElement("SPAN");
      hasLoan.id = "customerLoan";
      hasLoan.className = "fieldName";
      hasLoan.innerHTML = "Aktiv krediti var mı? ";

      var oneMonthSum = document.createElement("SPAN");
      oneMonthSum.id = "customerSum";
      oneMonthSum.className = "fieldName";
      oneMonthSum.innerHTML = "Bir aylıq kredit ödənişi: ";

      item.appendChild(img);
      item.appendChild(name);
      item.appendChild(
        document.createTextNode("\u00A0\u00A0" + array[i].name + "\u00A0\u00A0")
      );
      item.appendChild(surname);
      item.appendChild(
        document.createTextNode(
          "\u00A0\u00A0" + array[i].surname + "\u00A0\u00A0"
        )
      );
      item.appendChild(salary);
      item.appendChild(
        document.createTextNode(
          "\u00A0\u00A0" + array[i].salary.value + "\u00A0\u00A0"
        )
      );
      item.appendChild(hasLoan);
      item.appendChild(
        document.createTextNode(
          "\u00A0\u00A0" + array[i].hasLoanHistory
            ? "\u00A0\u00A0" + "Var" + "\u00A0\u00A0"
            : "\u00A0\u00A0" + "Yox" + "\u00A0\u00A0"
        )
      );

      item.appendChild(oneMonthSum);
      item.appendChild(
        document.createTextNode(
          "\u00A0\u00A0" + sumLoanPerMonth + "\u00A0\u00A0"
        )
      );

      list.appendChild(item);
    }
  }

  return list;
}
