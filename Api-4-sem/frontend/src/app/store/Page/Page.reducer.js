import Estacoes from "@/app/components/Pages/Estacoes/estacoes";
import DashboardInfo from "@/app/components/dashboards/dashboardInfo";

const initialState = {
    page: <Estacoes />,
    key: "",
    modal: false,
    dashboardValid: false,
    dashboardInfo: <DashboardInfo />
};

export default function rootReducer(state = initialState, action) {
    switch (action.type) {
        case 'page':
            return {
                ...state,
                page: action.payload,
            };
        case 'key':
            return {
                ...state,
                key: action.payload,
            };
        case 'modal':
            return {
                ...state,
                modal: action.payload,
            };
        case 'dashboardValid':
            return {
                ...state,
                dashboardValid: action.payload,
            };
        case 'dashboardInfo':
            return {
                ...state,
                dashboardInfo: action.payload,
            };
        default:
            return state;
    }
}