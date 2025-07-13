import React from 'react';

import * as Icon from 'react-feather';

export const SidebarData = [
          
    {
        label: "Main",
        submenuOpen: true,
        showSubRoute: false,
        submenuHdr: "Main",
        submenuItems: [
        {
            label: "Dashboard",
            icon: <Icon.Grid  />,
            submenu: true,
            showSubRoute: false,

            submenuItems: [
              { label: "Overview", link: "/" },
              { label: "Transaction Analytics", link: "/sales-dashboard" },
              { label: "Compliance Alerts", link: "/sales-dashboard" },
              { label: "Risk Heatmap", link: "/sales-dashboard" },
              { label: "System Health", link: "/" },
              
            ]
          },
          
        ]
      },
      {
        label: "Client & Company Management",
        submenuOpen: true,
        showSubRoute: false,
        submenuHdr: "Client & Company Management",
      
        submenuItems: [
          { label: "Corporate Onboarding", link: "/corporate-onboarding", icon:<Icon.Box />,showSubRoute: false,submenu: false },
          { label: "Company KYC Documents", link: "/company-KYC", icon:  <Icon.PlusSquare />,showSubRoute: false, submenu: false },
          { label: "Company User Mapping", link: "/company-user-mapping", icon:  <Icon.Codesandbox  />,showSubRoute: false,submenu: false },
          { label: "Company Access Rights", link: "/company-access-rights", icon: <Icon.TrendingDown  />,showSubRoute: false,submenu: false },
          { label: "Profile Management",icon:  <Icon.UserCheck />, link: "/profile-management" },
          { label: "Company Signatories",icon:  <Icon.UserCheck />, link: "/companysignatories"},
        ]
      },
      {
        label: "User & Role Management",
        submenuOpen: true,
        submenuHdr: "User & Role Management",
        submenu: true,
        showSubRoute: false,
        submenuItems: [
          { label: "Manage Users", link: "/users", icon:  <Icon.UserCheck />,showSubRoute: false },
          { label: "Role & Permission(RBAC)", link: "/roles-permissions", icon:  <Icon.UserCheck />,showSubRoute: false },
          {
            label: "User Activity Logs",
            submenu: true,
            showSubRoute: false,
             submenuItems: [
              { label: "Sign In", link: "/signin",showSubRoute: false },
                  { label: "Register", link: "/register",showSubRoute: false },
                  { label: "Delete", link: "/delete-account", icon:  <Icon.Lock />,showSubRoute: false },
              
         { label: "OTP", link: "/otp-settings",showSubRoute: false },
          { label: "Geo/IP Restrictions",link: "/ban-ip-address",showSubRoute: false }
        ]
      },
        ]},

      {
        label: "Transaction Operations",
        submenuOpen: true,
        submenuHdr: "Transaction Operations",
        submenu: false,
        showSubRoute: false,
        submenuItems: [
          { label: "Pending Transactions", link: "/sales-list", icon:  <Icon.ShoppingCart />,showSubRoute: false,submenu: false },
          { label: "Transaction Approval", link: "/invoice-report", icon:  <Icon.FileText />,showSubRoute: false,submenu: false },
          { label: "Force Cancel", link: "/sales-returns", icon:  <Icon.Copy />,showSubRoute: false,submenu: false },
          { label: "Transaction Histor", link: "/quotation-list", icon:  <Icon.Save />,showSubRoute: false,submenu: false },
          { label: "Bulk Payment Managemen", link: "/pos", icon:  <Icon.HardDrive />,showSubRoute: false,submenu: false },
          { label: "International Payments", link: "/pos", icon:  <Icon.HardDrive />,showSubRoute: false,submenu: false },
          { label: "Cheque/Manual Entry Review", link: "/pos", icon:  <Icon.HardDrive />,showSubRoute: false,submenu: false }
        ]
      },
    
      {
        label: "Beneficiary Oversight",
        submenuOpen: true,
        submenuHdr: "Beneficiary Oversight",
        showSubRoute: false,
        submenuItems: [
         { label: "Beneficiary Listing", link: "/purchase-list", icon:  <Icon.ShoppingBag />,showSubRoute: false,submenu: false },
          { label: "Approval Logs", link: "/purchase-order-report", icon:  <Icon.FileMinus />,showSubRoute: false ,submenu: false},
          { label: "PEP/Sanction Log Chec", link: "/purchase-returns", icon:  <Icon.RefreshCw />,showSubRoute: false,submenu: false },
          { label: "Edit or Suspend", link: "/purchase-returns", icon:  <Icon.RefreshCw />,showSubRoute: false,submenu: false }
        ]
      },
      {
        label: "Risk & Compliance",
        submenuOpen: true,
        submenuHdr: "Risk & Compliance",
        showSubRoute: false,
        submenuItems: [
          { label: "AML & CFT Rules", link: "/purchase-list", icon:  <Icon.ShoppingBag />,showSubRoute: false,submenu: false },
          { label: "Compliance Case Review", link: "/purchase-order-report", icon:  <Icon.FileMinus />,showSubRoute: false ,submenu: false},
          { label: "Audit Trail Logs", link: "/purchase-returns", icon:  <Icon.RefreshCw />,showSubRoute: false,submenu: false },
          { label: "Regulatory Export", link: "/purchase-returns", icon:  <Icon.RefreshCw />,showSubRoute: false,submenu: false },
          { label: "Sanctions/PEP Integration", link: "/purchase-returns", icon:  <Icon.RefreshCw />,showSubRoute: false,submenu: false }
        ]
      },
    
    

    {
        label: "Reports & Logs",
        submenuOpen: true,
        showSubRoute: false,
        submenuHdr: "Reports & Logs",
       submenuItems: [
          { label: "Payment Reports", link: "/sales-report", icon:  <Icon.BarChart2 /> ,showSubRoute: false },
          { label: "Audit Trail Exports", link: "/purchase-report", icon:  <Icon.PieChart />,showSubRoute: false },
          { label: "Compliance Reports", link: "/inventory-report", icon:  <Icon.Inbox />,showSubRoute: false },
          { label: "Risk Reports", link: "/invoice-report", icon:  <Icon.File />,showSubRoute: false },
          { label: "User Performance Logs", link: "/supplier-report", icon:  <Icon.UserCheck />,showSubRoute: false},
          
     
        ]
      },

      {
        label: "Support & Ticketing",
        submenuOpen: true,
        showSubRoute: false,
        submenuHdr: "Support & Ticketing",
      
        submenuItems: [
          { label: "Support Inbox", link: "/customers", icon:<Icon.User />,showSubRoute: false,submenu: false },
          { label: "Ticket Assignment", link: "/suppliers", icon:  <Icon.Users />,showSubRoute: false, submenu: false },
          { label: "Resolution Logs", link: "/store-list", icon:  <Icon.Home  />,showSubRoute: false,submenu: false },
          { label: "SLA Violations", link: "/warehouse", icon: <Icon.Archive />,showSubRoute: false,submenu: false },
     
        ]
      },
      
     
     


      
       
     

      {
        label: "Admin Settings",
        submenuOpen: true,
        submenuHdr: "Configuration & Admin Settings",
        submenu: true,
        showSubRoute: false,
        
        submenuItems: [
          { label: "Approval Rules & Thresholds", link: "/security-settings" },
            { label: "System Notifications", link: "/notification" },
            { label: "Working Hours & SLA Settings", link: "/connected-apps" },
            { label: "Escalation Workflows", link: "/connected-apps" },
            { label: "Holiday Calendar", link: "/connected-apps" },
            { label: "Announcements", link: "/connected-apps" },
            { label: "Password Policy", link: "/connected-apps" },
            
          
          
         
   
        ]
        

      },
      
      { label: "System Monitoring", submenu: true, 
          showSubRoute: false,
          submenuItems: [
            { label: "API Health Check", link: "/appearance",showSubRoute: false },
            { label: "Session Management", link: "/company-settings",showSubRoute: false },
            { label: "Device Binding Logs", link: "/social-authentication",showSubRoute: false },
            { label: "Change Logs", link: "/system-settings",showSubRoute: false }

          ]},


      
    ]
  