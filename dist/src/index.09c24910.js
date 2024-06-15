// jQuery
$(document).ready(function() {
    // jQuery methods go here...
    let timer;
    const $fname = $("#fname");
    const delay = 1200; // timer starts after typing
    const regEx = /^[A-Za-z ]+$/; //regular expersion for letters only
    const emailRegEx = /^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,}$/;
    //   alert conditionals and validation functions
    const isValid = (errorId, inputId)=>{
        $(`#${inputId}`).removeClass("alert");
        $(`#${errorId}`).text("");
        $(`#${errorId}`).attr("aria-hidden", "true");
    };
    const isBlank = (errorId, inputId)=>{
        console.log(errorId);
        console.log(inputId);
        $(`#${inputId}`).addClass("alert");
        $(`#${errorId}`).text("This field is required");
        $(`#${errorId}`).attr("aria-hidden", "false");
    };
    const notValid = (type, errorId, inputId)=>{
        switch(type){
            case "text":
                $(`#${inputId}`).addClass("alert");
                $(`#${errorId}`).text("Only accepts alphabets and spaces.");
                break;
            case "email":
                $(`#${inputId}`).addClass("alert");
                $(`#${errorId}`).text("Please enter a valid email address.");
                break;
            case "radio":
                $(`#${errorId}`).text("Please select a query type.");
                break;
            case "checkbox":
                $(`#${errorId}`).text("To submit this form, please consent to being contacted.");
                break;
            default:
                return;
        }
        $(`#${errorId}`).attr("aria-hidden", "false");
    };
    //   Error pop-out upon onchange on Names
    $('input[type="text"]').each(function() {
        const elemID1 = $(this).attr("id");
        $(this).on("input", ()=>{
            clearTimeout(timer);
            timer = setTimeout(()=>{
                $(this).val() === "" ? isBlank(`error-${elemID1}`, elemID1) : !regEx.test($(this).val()) ? notValid("text", `error-${elemID1}`, elemID1) : isValid(`error-${elemID1}`, elemID1);
            }, delay);
        });
    });
    // Error pop-out upon onchange on Email
    $('input[type="email"]').each(function() {
        const elemID1 = $(this).attr("id");
        $(this).on("input", ()=>{
            clearTimeout(timer);
            timer = setTimeout(()=>{
                $(this).val() === "" ? isBlank(`error-${elemID1}`, elemID1) : !emailRegEx.test($(this).val()) ? notValid("email", `error-${elemID1}`, elemID1) : isValid(`error-${elemID1}`, elemID1);
            }, delay);
        });
    });
    //  Error pop-out upon onselect Radio
    $("input[type='radio']").on("click", ()=>{
        clearTimeout(timer);
        timer = setTimeout(()=>{
            !$('input[name="option"]:checked').length > 0 ? notValid("radio", "error-radio") : isValid("error-radio", "radio");
        }, delay);
    });
    //  Error pop-out upon onchange Message
    $("textarea").on("input", ()=>{
        clearTimeout(timer);
        timer = setTimeout(()=>{
            $("textarea").val() === "" ? isBlank("error-msg", "message") : isValid("error-msg", "message");
        }, delay);
    });
    // Error pop-out upon onselect Checkbox
    $("input[type='checkbox']").on("click", ()=>{
        clearTimeout(timer);
        timer = setTimeout(()=>{
            !$('input[name="consent"]:checked').length > 0 ? notValid("checkbox", "error-consent", "consent") : isValid("error-consent", "consent");
        }, delay);
    });
    // VALIDATE EACH INPUTS UPON BUTTON CLICK
    function validateInput(inputId, errorId, type) {
        const newID = $(`#${inputId}`);
        // const isValidated = true;
        switch(type){
            case "text":
                newID.val() == "" ? isBlank(`error-${errorId}`, inputId) : !regEx.test(newID.val()) ? notValid("text", `error-${elemID}`, elemID) : isValid(`error-${errorId}`, inputId);
                break;
            case "email":
                newID.val() == "" ? isBlank(`error-${errorId}`, inputId) : !emailRegEx.test($(newID).val()) ? notValid("email", `error-${errorId}`, inputId) : isValid(`error-${errorId}`, inputId);
                break;
            case "radio":
                !$('input[name="option"]:checked').length > 0 ? notValid("radio", `error-${errorId}`) : isValid(`error-${errorId}`, inputId);
                break;
            case "checkbox":
                !$('input[name="consent"]:checked').length > 0 ? notValid("checkbox", `error-${errorId}`, inputId) : isValid(`error-${errorId}`, inputId);
                break;
            case "message":
                newID.val() == "" ? isBlank(`error-${errorId}`, inputId) : isValid(`error-${errorId}`, inputId);
                break;
            default:
                return console.log("No more error! proceed");
        }
    }
    // Button validations
    $(".btn-submit").click(function validateInputs(event) {
        let errorsExist = false;
        // Run validation
        validateInput("fname", "fname", "text");
        validateInput("lname", "lname", "text");
        validateInput("email", "email", "email");
        validateInput("radio", "radio", "radio");
        validateInput("message", "msg", "message");
        validateInput("consent", "consent", "checkbox");
        // Check if any error messages are visible
        $(".error-message").each(function() {
            $(this).attr("aria-hidden") == "false" && (errorsExist = true); // Exit the loop early if an error is found
        });
        function showSuccess() {
            $(".toast").addClass("show");
            setTimeout(function() {
                $(".toast").removeClass("show");
            }, 3000);
        }
        // showSuccess();
        errorsExist ? event.preventDefault() // Prevent form submission
         : showSuccess();
    });
});

//# sourceMappingURL=index.09c24910.js.map
