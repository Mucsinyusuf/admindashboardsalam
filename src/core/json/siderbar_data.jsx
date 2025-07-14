import React from "react";
import * as Icon from "react-feather";

export const SidebarData = [
  {
    label: "Main",
    submenuOpen: true,
    showSubRoute: false,
    submenuHdr: "Main",
    submenuItems: [
      {
        label: "Dashboard",
        icon: <Icon.Grid />,
        submenu: true,
        showSubRoute: false,
        submenuItems: [
          { label: "Overview", link: "/" },
          { label: "Transaction Analytics", link: "/sales-dashboard" },
          { label: "Compliance Alerts", link: "/sales-dashboard" },
          { label: "Risk Heatmap", link: "/sales-dashboard" },
          { label: "System Health", link: "/" },
        ],
      },
    ],
  },
  {
    label: "Client & Company Management",
    submenuOpen: true,
    showSubRoute: false,
    submenuHdr: "Client & Company Management",
    submenuItems: [
      
      { label: "Company KYC Documents", link: "/company-KYC", icon: <Icon.FileText /> },
      { label: "Company User Mapping", link: "/company-user-mapping", icon: <Icon.Users /> },
      { label: "Company Access Rights", link: "/company-access-rights", icon: <Icon.Lock /> },
      { label: "Profile Management", link: "/profile-management", icon: <Icon.UserCheck /> },
      { label: "Company Signatories", link: "/companysignatories", icon: <Icon.UserPlus /> },
      { label: "Corporate Onboarding", link: "/corporate-onboarding", icon: <Icon.Briefcase /> }
    ],
  },
  {
    label: "User & Role Management",
    submenuOpen: true,
    submenuHdr: "User & Role Management",
    submenu: true,
    showSubRoute: false,
    submenuItems: [
      { label: "Manage Users", link: "/users", icon: <Icon.Users /> },
      { label: "Role & Permission(RBAC)", link: "/roles-permissions", icon: <Icon.Shield /> },
      {
        label: "User Activity Logs",
        submenu: true,
        showSubRoute: false,
        submenuItems: [
          { label: "Sign In", link: "/signin" },
          { label: "Register", link: "/register" },
          { label: "Delete", link: "/delete-account", icon: <Icon.UserX /> },
          { label: "OTP", link: "/otp-settings" },
          { label: "Geo/IP Restrictions", link: "/ban-ip-address" },
        ],
      },
    ],
  },
  {
    label: "Transaction Operations",
    submenuOpen: true,
    submenuHdr: "Transaction Operations",
    submenu: false,
    showSubRoute: false,
    submenuItems: [
      { label: "Pending Transactions", link: "/sales-list", icon: <Icon.Clock /> },
      { label: "Transaction Approval", link: "/invoice-report", icon: <Icon.CheckSquare /> },
      { label: "Force Cancel", link: "/sales-returns", icon: <Icon.XCircle /> },
      { label: "Transaction History", link: "/quotation-list", icon: <Icon.BookOpen /> },
      { label: "Bulk Payment Management", link: "/pos", icon: <Icon.DownloadCloud /> },
      { label: "International Payments", link: "/pos", icon: <Icon.Globe /> },
      { label: "Cheque/Manual Entry Review", link: "/pos", icon: <Icon.Edit3 /> },
    ],
  },
  {
    label: "Beneficiary Oversight",
    submenuOpen: true,
    submenuHdr: "Beneficiary Oversight",
    showSubRoute: false,
    submenuItems: [
      { label: "Beneficiary Listing", link: "/purchase-list", icon: <Icon.Users /> },
      { label: "Approval Logs", link: "/purchase-order-report", icon: <Icon.FileText /> },
      { label: "PEP/Sanction Log Check", link: "/purchase-returns", icon: <Icon.AlertCircle /> },
      { label: "Edit or Suspend", link: "/purchase-returns", icon: <Icon.UserMinus /> },
    ],
  },
  {
    label: "Risk & Compliance",
    submenuOpen: true,
    submenuHdr: "Risk & Compliance",
    showSubRoute: false,
    submenuItems: [
      { label: "AML & CFT Rules", link: "/purchase-list", icon: <Icon.Shield /> },
      { label: "Compliance Case Review", link: "/purchase-order-report", icon: <Icon.AlertTriangle /> },
      { label: "Audit Trail Logs", link: "/purchase-returns", icon: <Icon.File /> },
      { label: "Regulatory Export", link: "/purchase-returns", icon: <Icon.Share /> },
      { label: "Sanctions/PEP Integration", link: "/purchase-returns", icon: <Icon.Database /> },
    ],
  },
  {
    label: "Reports & Logs",
    submenuOpen: true,
    showSubRoute: false,
    submenuHdr: "Reports & Logs",
    submenuItems: [
      { label: "Payment Reports", link: "/sales-report", icon: <Icon.BarChart2 /> },
      { label: "Audit Trail Exports", link: "/purchase-report", icon: <Icon.FileMinus /> },
      { label: "Compliance Reports", link: "/inventory-report", icon: <Icon.Inbox /> },
      { label: "Risk Reports", link: "/invoice-report", icon: <Icon.AlertOctagon /> },
      { label: "User Performance Logs", link: "/supplier-report", icon: <Icon.Activity /> },
    ],
  },
  {
    label: "Support & Ticketing",
    submenuOpen: true,
    showSubRoute: false,
    submenuHdr: "Support & Ticketing",
    submenuItems: [
      { label: "Support Inbox", link: "/customers", icon: <Icon.Mail /> },
      { label: "Ticket Assignment", link: "/suppliers", icon: <Icon.CheckCircle /> },
      { label: "Resolution Logs", link: "/store-list", icon: <Icon.Book /> },
      { label: "SLA Violations", link: "/warehouse", icon: <Icon.AlertCircle /> },
    ],
  },
  {
    label: "Admin Settings",
    submenuOpen: true,
    submenuHdr: "Configuration & Admin Settings",
    submenu: true,
    showSubRoute: false,
    submenuItems: [
      { label: "Approval Rules & Thresholds", link: "/security-settings", icon: <Icon.Sliders /> },
      { label: "System Notifications", link: "/notification", icon: <Icon.Bell /> },
      { label: "Working Hours & SLA Settings", link: "/connected-apps", icon: <Icon.Clock /> },
      { label: "Escalation Workflows", link: "/connected-apps", icon: <Icon.Share2 /> },
      { label: "Holiday Calendar", link: "/connected-apps", icon: <Icon.Calendar /> },
      { label: "Announcements", link: "/connected-apps", icon: <Icon.Volume2 /> },
      { label: "Password Policy", link: "/connected-apps", icon: <Icon.Key /> },
    ],
  },
  {
    label: "System Monitoring",
    submenu: true,
    showSubRoute: false,
    submenuItems: [
      { label: "API Health Check", link: "/appearance", icon: <Icon.Activity /> },
      { label: "Session Management", link: "/company-settings", icon: <Icon.Users /> },
      { label: "Device Binding Logs", link: "/social-authentication", icon: <Icon.Smartphone /> },
      { label: "Change Logs", link: "/system-settings", icon: <Icon.FileText /> },
    ],
  },
];
