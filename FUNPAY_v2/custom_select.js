
// Custom Select Logic
window.setupCustomSelects = function () {
    const selects = document.getElementsByTagName("select");
    // Convert logic to handle live collection or simple loop
    // Since we modify the DOM (inserting divs), getElementsByTagName is live.
    // Better to use querySelectorAll but that is static (good).
    // But we need to be careful not to process already processed ones.

    // Let's use a robust approach
    const allSelects = document.querySelectorAll("select");

    allSelects.forEach(selElmnt => {
        // Check if already processed
        if (selElmnt.parentNode.classList.contains('custom-select-wrapper')) return;

        // Create Wrapper
        const wrapper = document.createElement("div");
        wrapper.setAttribute("class", "custom-select-wrapper");
        selElmnt.parentNode.insertBefore(wrapper, selElmnt);
        wrapper.appendChild(selElmnt);

        // Create Selected Item (Button)
        const selectedDiv = document.createElement("div");
        selectedDiv.setAttribute("class", "select-selected");
        // Handle empty options or initial state
        const selectedOption = selElmnt.options[selElmnt.selectedIndex];
        const placeholder = selElmnt.getAttribute('data-placeholder') || (window.getTranslation ? window.getTranslation('select_placeholder') : 'Select');
        selectedDiv.innerHTML = selectedOption ? selectedOption.innerHTML : placeholder;
        wrapper.appendChild(selectedDiv);

        // Create Options List
        const optionsDiv = document.createElement("div");
        optionsDiv.setAttribute("class", "select-items");

        for (let j = 0; j < selElmnt.length; j++) {
            const optionDiv = document.createElement("div");
            optionDiv.innerHTML = selElmnt.options[j].innerHTML;
            optionDiv.setAttribute("data-index", j); // Store index

            if (selElmnt.options[j].selected) {
                optionDiv.setAttribute("class", "same-as-selected");
            }

            optionDiv.addEventListener("click", function (e) {
                const s = this.parentNode.parentNode.querySelector("select");
                const h = this.parentNode.previousSibling;
                const index = parseInt(this.getAttribute("data-index"));

                if (s.options[index]) {
                    s.selectedIndex = index;
                    h.innerHTML = this.innerHTML;

                    const y = this.parentNode.getElementsByClassName("same-as-selected");
                    for (let l = 0; l < y.length; l++) {
                        y[l].removeAttribute("class");
                    }
                    this.setAttribute("class", "same-as-selected");

                    s.dispatchEvent(new Event('change'));
                }
                h.click();
            });
            optionsDiv.appendChild(optionDiv);
        }
        wrapper.appendChild(optionsDiv);

        // Toggle Open/Close
        selectedDiv.addEventListener("click", function (e) {
            e.stopPropagation();
            closeAllSelect(this);
            this.parentNode.classList.toggle("open"); // Toggle on wrapper
            this.classList.toggle("select-arrow-active");

            const list = this.nextSibling;
            if (this.parentNode.classList.contains("open")) {
                list.classList.add("select-show");
            } else {
                list.classList.remove("select-show");
            }
        });
    });
};

function closeAllSelect(elmnt) {
    /* A function that will close all select boxes in the document,
    except the current select box: */
    const x = document.getElementsByClassName("select-items");
    const y = document.getElementsByClassName("select-selected");
    const arrNo = [];

    for (let i = 0; i < y.length; i++) {
        if (elmnt == y[i]) {
            arrNo.push(i)
        } else {
            y[i].classList.remove("select-arrow-active");
        }
    }

    for (let i = 0; i < x.length; i++) {
        if (arrNo.indexOf(i)) {
            x[i].classList.remove("select-show");
        }
    }
}

/* If the user clicks anywhere outside the select box,
then close all select boxes: */
document.addEventListener("click", closeAllSelect);

// Init on load
document.addEventListener('DOMContentLoaded', () => {
    // Small delay to ensure other scripts rendered their HTML if any
    setTimeout(window.setupCustomSelects, 50);
});

// Also expose global for manual re-init
window.initCustomSelects = window.setupCustomSelects;

window.destroyCustomSelect = function (selElmnt) {
    if (selElmnt && selElmnt.parentNode && selElmnt.parentNode.classList.contains('custom-select-wrapper')) {
        const wrapper = selElmnt.parentNode;
        const container = wrapper.parentNode;
        container.insertBefore(selElmnt, wrapper);
        wrapper.remove();
    }
};
