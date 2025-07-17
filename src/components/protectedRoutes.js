// src/routes/protectedRoutes.js

// Components
import Dashboard from "../feature-module/dashboard/Dashboard";
import SalesDashboard from "../feature-module/dashboard/Salesdashboard";
import AccountLookupStep from "../feature-module/inventory/productlist";
import KYCForm from "../feature-module/inventory/addproduct";
import CompanyUserMapping from "../feature-module/inventory/expiredproduct";
import AccessRights from "../feature-module/inventory/lowstock";
import ProfileManagement from "../feature-module/inventory/productdetail";
import CompanySignatories from "../feature-module/inventory/qrcode";
import AccountTypes from "../feature-module/inventory/units";
import SystemSettings from "../feature-module/settings/websitesettings/systemsettings";
import SocialAuthentication from "../feature-module/settings/websitesettings/socialauthentication";
import CompanySettings from "../feature-module/settings/websitesettings/companysettings";
import Appearance from "../feature-module/settings/websitesettings/appearance";
import ConnectedApps from "../feature-module/settings/generalsettings/connectedapps";
import Notification from "../feature-module/settings/generalsettings/notification";
import SecuritySettings from "../feature-module/settings/generalsettings/securitysettings";
import WareHouses from "../core/modals/peoples/warehouses";
import StoreList from "../core/modals/peoples/storelist";
import Suppliers from "../feature-module/people/suppliers";
import Customers from "../feature-module/people/customers";
import SupplierReport from "../feature-module/Reports/supplierreport";
import InventoryReport from "../feature-module/Reports/inventoryreport";
import PurchaseReport from "../feature-module/Reports/purchasereport";
import SalesReport from "../feature-module/Reports/salesreport";
import PurchaseReturns from "../feature-module/purchases/purchasereturns";
import PurchaseOrderReport from "../feature-module/purchases/purchaseorderreport";
import PurchasesList from "../feature-module/purchases/purchaseslist";
import SalesList from "../feature-module/sales/saleslist";
import SalesReturn from "../feature-module/sales/salesreturn";
import QuotationList from "../feature-module/sales/quotationlist";
import CurrencySettings from "../feature-module/settings/financialsettings/currencysettings";
import InvoiceReport from "../feature-module/sales/invoicereport";
import Users from "../feature-module/usermanagement/users";
import RolesPermissions from "../feature-module/usermanagement/rolespermissions";
import GeoRestrictions from "../feature-module/settings/othersettings/storagesettings";
import DeleteAccount from "../feature-module/usermanagement/deleteaccount";
import OtpSettings from "../feature-module/settings/systemsettings/otpsettings";
import UserActivityLogs from "../feature-module/settings/othersettings/ban-ipaddress";
import ComplianceAlertList from "../feature-module/inventory/brandlist";
import CategoryList from "../feature-module/inventory/categorylist";
import EditProduct from "../feature-module/inventory/editproduct";


















// Placeholder

const protectedRoutes = [
  { path: "/overview", component: Dashboard },
  { path: "/system-health", component: EditProduct },
  { path: "/transaction-analytics", component: SalesDashboard },
  { path: "/compliance", component: ComplianceAlertList},
  { path: "/heatmap", component: CategoryList},

  { path: "/corporate-onboarding", component:AccountLookupStep },
  { path: "/company-KYC", component: KYCForm },
  { path: "/company-user-mapping", component: CompanyUserMapping },
  { path: "/company-access-rights", component: AccessRights },
  { path: "/profile-management", component: ProfileManagement },
  { path: "/companysignatories", component: CompanySignatories },
  { path: "/accountTypes", component: AccountTypes },

  { path: "/manage-users", component: Users },
  { path: "/roles-permissions", component: RolesPermissions },
  { path: "/Geo/IP-restrictions", component: GeoRestrictions },
  { path: "/delete-account", component: DeleteAccount },
  { path: "/otp-settings", component: OtpSettings},
  { path: "/user-activity-logs", component: UserActivityLogs},

  { path: "/sales-list", component: SalesList },
  { path: "/invoice-report", component: InvoiceReport },
  { path: "/sales-returns", component: SalesReturn},
  { path: "/quotation-list", component: QuotationList },
  { path: "/pos", component: CurrencySettings },

  { path: "/purchase-list", component: PurchasesList },
  { path: "/purchase-order-report", component: PurchaseOrderReport },
  { path: "/purchase-returns", component: PurchaseReturns},

  { path: "/security-settings", component: SecuritySettings },


  { path: "/sales-report", component: SalesReport },
  { path: "/purchase-report", component: PurchaseReport },
  { path: "/inventory-report", component: InventoryReport },
  { path: "/supplier-report", component: SupplierReport },

  { path: "/customers", component: Customers  },
  { path: "/suppliers", component: Suppliers },
  { path: "/store-list", component: StoreList },
  { path: "/warehouse", component: WareHouses },


  { path: "/notification", component: Notification },

  { path: "/connected-apps", component: ConnectedApps },


  { path: "/appearance", component: Appearance },

  { path: "/company-settings", component: CompanySettings },

  { path: "/social-authentication", component: SocialAuthentication },


  { path: "/system-settings", component: SystemSettings },
];

export default protectedRoutes;