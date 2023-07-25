import Cookies from "js-cookie";

function log_out() {
    Cookies.remove('LIF_TOKEN');
    Cookies.remove('LIF_USERNAME');
}

export default log_out;