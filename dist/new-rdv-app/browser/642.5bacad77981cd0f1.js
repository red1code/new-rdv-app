"use strict";(self.webpackChunknew_rdv_app=self.webpackChunknew_rdv_app||[]).push([[642],{3642:(ht,v,a)=>{a.r(v),a.d(v,{DashboardModule:()=>pt});var c=a(6895),l=a(4006),b=a(6471),g=a(9116),t=a(4650),_=a(7392),d=a(5861),f=a(6518),Z=a(4961),m=a(7694),x=a(6912),T=a(2824),A=a(4393),p=a(6188);let C=(()=>{class n{constructor(){this.bgColor="#ffffff"}ngOnChanges(e){e.chartY&&this.updateChart(this.chartY)}ngOnInit(){}ngAfterViewInit(){this.chart=this.loadChart()}loadChart(){return this.chartConfig(this.chartID,this.chartX,this.chartY,this.chartTitle,this.chartType)}chartConfig(e,o,r,i,lt){const ut=document.getElementById(e).getContext("2d");return new A.kL(ut,{type:lt,data:{labels:o,datasets:[{label:"",data:r,backgroundColor:["rgba(153, 102, 255, 0.2)","rgba(54, 162, 235, 0.2)","rgba(255, 206, 86, 0.2)","rgba(75, 192, 192, 0.2)","rgba(153, 102, 255, 0.2)","rgba(255, 159, 64, 0.2)","rgba(255, 99, 132, 0.2)","rgba(54, 162, 235, 0.2)","rgba(255, 206, 86, 0.2)","rgba(75, 192, 192, 0.2)","rgba(153, 102, 255, 0.2)","rgba(255, 159, 64, 0.2)"],borderColor:["rgba(153, 102, 255, 1)","rgba(54, 162, 235, 1)","rgba(255, 206, 86, 1)","rgba(75, 192, 192, 1)","rgba(153, 102, 255, 1)","rgba(255, 159, 64, 1)","rgba(255, 99, 132, 1)","rgba(54, 162, 235, 1)","rgba(255, 206, 86, 1)","rgba(75, 192, 192, 1)","rgba(153, 102, 255, 1)","rgba(255, 159, 64, 1)"],borderWidth:1,borderRadius:5}]},options:{responsive:!0,maintainAspectRatio:!1,plugins:{title:{display:!0,text:i,font:{size:25}}}}})}updateChart(e){this.chart&&(this.chart.data.datasets.map(o=>o.data=e),this.chart.update())}exportChart(){const e=document.getElementById(this.chartID),o=document.createElement("canvas");o.width=e.width,o.height=e.height;const r=o.getContext("2d");r.fillStyle=this.bgColor,r?.fillRect(0,0,e.width,e.height),r?.drawImage(e,0,0);const i=document.createElement("a");i.href=o.toDataURL(),i.download=this.chart.options.plugins?.title?.text,i.click()}}return n.\u0275fac=function(e){return new(e||n)},n.\u0275cmp=t.Xpm({type:n,selectors:[["app-chart"]],inputs:{chartID:"chartID",chartX:"chartX",chartY:"chartY",chartTitle:"chartTitle",chartType:"chartType"},features:[t.TTD],decls:12,vars:10,consts:[[1,"chart-container"],[1,"hdr-container"],[2,"display","flex","align-items","center"],[2,"margin-right","7px","white-space","nowrap"],["type","color",1,"bg-color","form-control",3,"ngModel","ngModelChange"],[1,"export-btns",3,"click"],[1,"canva-container"],[1,"chart",3,"id"]],template:function(e,o){1&e&&(t.TgZ(0,"div",0)(1,"div",1)(2,"div",2)(3,"span",3),t._uU(4),t.ALo(5,"translate"),t.qZA(),t.TgZ(6,"input",4),t.NdJ("ngModelChange",function(i){return o.bgColor=i}),t.qZA()(),t.TgZ(7,"button",5),t.NdJ("click",function(){return o.exportChart()}),t._uU(8),t.ALo(9,"translate"),t.qZA()(),t.TgZ(10,"div",6),t._UZ(11,"canvas",7),t.qZA()()),2&e&&(t.xp6(4),t.Oqu(t.lcZ(5,6,"Change Background Color ")),t.xp6(2),t.Q6J("ngModel",o.bgColor),t.xp6(2),t.hij(" ",t.lcZ(9,8,"Export To Image")," "),t.xp6(3),t.Udp("background-color",o.bgColor),t.Q6J("id",o.chartID))},dependencies:[l.Fj,l.JJ,l.On,p.X$],styles:[".chart-container[_ngcontent-%COMP%]{overflow:scroll;overflow-y:hidden;padding:5px}.hdr-container[_ngcontent-%COMP%]{display:flex;justify-content:space-between;align-items:center;padding:11px;border-bottom:1px dotted #000;min-width:500px}.bg-color[_ngcontent-%COMP%]{width:75px;padding:0;cursor:pointer;border:1px solid #191970}.btn-outline-success[_ngcontent-%COMP%]{height:40px;min-width:max-content}.canva-container[_ngcontent-%COMP%]{position:relative;height:70vh;min-width:500px}.chart[_ngcontent-%COMP%]{padding:15px;border-radius:7px}@media screen and (max-width: 650px){.hdr-container[_ngcontent-%COMP%]{display:flex;flex-direction:column-reverse}.btn-outline-success[_ngcontent-%COMP%]{margin-bottom:15px}}"]}),n})();function P(n,s){if(1&n){const e=t.EpF();t.TgZ(0,"div",5)(1,"app-table",6),t.NdJ("updateInfosEvent",function(r){t.CHM(e);const i=t.oxw();return t.KtG(i.proceedToUpdate(r))}),t.qZA()()}if(2&n){const e=t.oxw();t.xp6(1),t.Q6J("tableCols",e.usrsCols)("infos",e.users)("showBtns",!0)("currentUser",e.user)}}function R(n,s){if(1&n&&(t.TgZ(0,"p",14),t._uU(1),t.qZA()),2&n){const e=t.oxw(2);t.xp6(1),t.Oqu(e.updateErrMsg)}}function w(n,s){if(1&n){const e=t.EpF();t.TgZ(0,"div",7)(1,"div",8)(2,"div",9),t._uU(3),t.ALo(4,"translate"),t.qZA(),t.TgZ(5,"div",10),t.NdJ("click",function(){t.CHM(e);const r=t.oxw();return t.KtG(r.hideEditProfilePopUp())}),t.ALo(6,"translate"),t._uU(7," \xd7 "),t.qZA()(),t.TgZ(8,"div",11)(9,"app-edit-profile",12),t.NdJ("updatedValues",function(r){t.CHM(e);const i=t.oxw();return t.KtG(i.updateProfile(r))}),t.qZA(),t.YNc(10,R,2,1,"p",13),t.qZA()()}if(2&n){const e=t.oxw();t.xp6(3),t.hij(" ",t.lcZ(4,5,"Edit Profile")," "),t.xp6(2),t.s9C("title",t.lcZ(6,7,"Cancel")),t.xp6(4),t.Q6J("profileInfos",e.updateUser)("currentUser",e.user),t.xp6(1),t.Q6J("ngIf",e.updateErrMsg)}}function M(n,s){if(1&n&&(t.TgZ(0,"div",15),t._UZ(1,"app-chart",16),t.ALo(2,"translate"),t.qZA()),2&n){const e=t.oxw();t.xp6(1),t.s9C("chartTitle",t.lcZ(2,5,"New Users Per Month")),t.Q6J("chartX",e.months)("chartY",e.usrsPerMonth)("chartType","bar")("chartID","usrsChart")}}function y(n,s){if(1&n){const e=t.EpF();t.TgZ(0,"div",17),t.NdJ("click",function(){t.CHM(e);const r=t.oxw();return t.KtG(r.hideEditProfilePopUp())}),t.qZA()}}let D=(()=>{class n{constructor(e,o,r){this.authService=e,this.usersService=o,this.translatingService=r,this.usrsCols=this.translatingService.getUsersCols(),this.editProfilePopup=!1,this.updateErrMsg="",this.months=this.translatingService.getMonths(),this.showEditProfilePopUp=()=>this.editProfilePopup=!0}ngOnInit(){this.authService.getUser().subscribe(e=>this.user=e),this.usersService.getAllUsers().subscribe(e=>{const o=e.map(r=>new Date(r.created_at).toLocaleString("en",{month:"short"}));this.usrsPerMonth=this.translatingService.getEngMonths().map(r=>o.filter(i=>i==r).length),this.users=e})}get adminAccess(){return this.authService.canCRUDusers(this.user)}proceedToUpdate(e){this.updateUser=e,this.showEditProfilePopUp()}updateProfile(e){var o=this;return(0,d.Z)(function*(){try{yield o.usersService.updateProfile(o.updateUser?.uid,e),o.hideEditProfilePopUp()}catch(r){o.updateErrMsg=r}})()}hideEditProfilePopUp(){this.editProfilePopup=!1,this.updateErrMsg=""}}return n.\u0275fac=function(e){return new(e||n)(t.Y36(f.e),t.Y36(Z.f),t.Y36(m.o))},n.\u0275cmp=t.Xpm({type:n,selectors:[["app-users-part"]],decls:5,vars:4,consts:[[1,"usrs-part-container"],["class","table-container facebook-style",4,"ngIf"],["class","popup-modal facebook-style",4,"ngIf"],["class","chart-container facebook-style",4,"ngIf"],["class","overlay",3,"click",4,"ngIf"],[1,"table-container","facebook-style"],[3,"tableCols","infos","showBtns","currentUser","updateInfosEvent"],[1,"popup-modal","facebook-style"],[1,"popup-modal-header"],[1,"title"],[1,"close-btn",3,"title","click"],[1,"popup-modal-body"],[3,"profileInfos","currentUser","updatedValues"],["class","text-danger",4,"ngIf"],[1,"text-danger"],[1,"chart-container","facebook-style"],[3,"chartX","chartY","chartType","chartTitle","chartID"],[1,"overlay",3,"click"]],template:function(e,o){1&e&&(t.TgZ(0,"div",0),t.YNc(1,P,2,4,"div",1),t.YNc(2,w,11,9,"div",2),t.YNc(3,M,3,7,"div",3),t.qZA(),t.YNc(4,y,1,0,"div",4)),2&e&&(t.xp6(1),t.Q6J("ngIf",o.adminAccess&&o.users),t.xp6(1),t.Q6J("ngIf",o.editProfilePopup),t.xp6(1),t.Q6J("ngIf",o.users&&o.usrsPerMonth),t.xp6(1),t.Q6J("ngIf",o.editProfilePopup))},dependencies:[c.O5,x.a,T.z,C,p.X$],styles:[".chart-container[_ngcontent-%COMP%]{padding:15px;max-width:90%;margin-inline:auto}@media screen and (max-width: 950px){.chart-container[_ngcontent-%COMP%]{max-width:100%}}"]}),n})();var u=a(50),U=a(4286),I=a(362);function N(n,s){if(1&n){const e=t.EpF();t.TgZ(0,"div",5)(1,"div",6)(2,"span",7),t._uU(3),t.ALo(4,"translate"),t.qZA()(),t.TgZ(5,"app-table",8),t.NdJ("updateInfosEvent",function(r){t.CHM(e);const i=t.oxw();return t.KtG(i.showHalfwayPopup(r))}),t.ALo(6,"async"),t.qZA()()}if(2&n){const e=t.oxw();t.xp6(3),t.Oqu(t.lcZ(4,5,"Pending Rendezvous")),t.xp6(2),t.Q6J("tableCols",e.pendingRDVsCols)("infos",t.lcZ(6,7,e.pendingRendezvous))("showBtns",!0)("currentUser",e.user)}}function z(n,s){if(1&n){const e=t.EpF();t.TgZ(0,"div",5)(1,"div",6)(2,"span",7),t._uU(3),t.ALo(4,"translate"),t.qZA()(),t.TgZ(5,"app-table",8),t.NdJ("updateInfosEvent",function(r){t.CHM(e);const i=t.oxw();return t.KtG(i.showHalfwayPopup(r))}),t.ALo(6,"async"),t.qZA()()}if(2&n){const e=t.oxw();t.xp6(3),t.Oqu(t.lcZ(4,5,"Approved Rendezvous")),t.xp6(2),t.Q6J("tableCols",e.approvedRDVsCols)("infos",t.lcZ(6,7,e.approvedRendezvous))("showBtns",!0)("currentUser",e.user)}}function J(n,s){1&n&&(t.TgZ(0,"span"),t._uU(1),t.ALo(2,"translate"),t.qZA()),2&n&&(t.xp6(1),t.Oqu(t.lcZ(2,1,"Approve, Update or Delete this Rendezvous")))}function O(n,s){1&n&&(t.TgZ(0,"span"),t._uU(1),t.ALo(2,"translate"),t.qZA()),2&n&&(t.xp6(1),t.Oqu(t.lcZ(2,1,"Update, Finish or Cancel this Rendezvous")))}function k(n,s){if(1&n&&(t.TgZ(0,"p",21),t._uU(1),t.qZA()),2&n){const e=t.oxw(2);t.xp6(1),t.Oqu(e.errorMsg)}}function q(n,s){if(1&n){const e=t.EpF();t.TgZ(0,"button",22),t.NdJ("click",function(){t.CHM(e);const r=t.oxw(2);return t.KtG(r.proceedToApproveRDV())}),t._uU(1),t.ALo(2,"translate"),t.qZA()}2&n&&(t.xp6(1),t.hij(" ",t.lcZ(2,1,"Approve")," "))}function S(n,s){if(1&n){const e=t.EpF();t.TgZ(0,"button",23),t.NdJ("click",function(){t.CHM(e);const r=t.oxw(2);return t.KtG(r.deleteRendezvous())}),t._uU(1),t.ALo(2,"translate"),t.qZA()}2&n&&(t.xp6(1),t.hij(" ",t.lcZ(2,1,"Delete")," "))}function E(n,s){if(1&n){const e=t.EpF();t.TgZ(0,"button",23),t.NdJ("click",function(){t.CHM(e);const r=t.oxw(2);return t.KtG(r.cancelRendezvous())}),t._uU(1),t.ALo(2,"translate"),t.qZA()}2&n&&(t.xp6(1),t.hij(" ",t.lcZ(2,1,"Cancel")," "))}const V=function(n,s){return{"cols-3":n,"cols-2":s}};function Q(n,s){if(1&n){const e=t.EpF();t.TgZ(0,"div",9)(1,"div",10)(2,"div",11),t.YNc(3,J,3,3,"span",12),t.YNc(4,O,3,3,"span",12),t.qZA(),t.TgZ(5,"div",13),t.NdJ("click",function(){t.CHM(e);const r=t.oxw();return t.KtG(r.hidePopup())}),t.ALo(6,"translate"),t._uU(7," \xd7 "),t.qZA()(),t.TgZ(8,"div",14)(9,"p",15),t._uU(10),t.ALo(11,"translate"),t.TgZ(12,"strong"),t._uU(13),t.qZA(),t._UZ(14,"br"),t._uU(15),t.ALo(16,"translate"),t.TgZ(17,"strong"),t._uU(18),t.qZA(),t._uU(19,". "),t.qZA(),t.YNc(20,k,2,1,"p",16),t.TgZ(21,"div",17),t.YNc(22,q,3,3,"button",18),t.TgZ(23,"button",19),t.NdJ("click",function(){t.CHM(e);const r=t.oxw();return t.KtG(r.proceedToUpdateRDV())}),t._uU(24),t.ALo(25,"translate"),t.qZA(),t.YNc(26,S,3,3,"button",20),t.YNc(27,E,3,3,"button",20),t.qZA()()()}if(2&n){const e=t.oxw();t.xp6(3),t.Q6J("ngIf",e.isPending),t.xp6(1),t.Q6J("ngIf",e.isApproved),t.xp6(1),t.s9C("title",t.lcZ(6,13,"Cancel")),t.xp6(5),t.hij(" - ",t.lcZ(11,15,"Name:")," "),t.xp6(3),t.Oqu(null==e.rdv?null:e.rdv.displayName),t.xp6(2),t.hij(" - ",t.lcZ(16,17,"Created in:")," "),t.xp6(3),t.Oqu(null==e.rdv?null:e.rdv.createdAt),t.xp6(2),t.Q6J("ngIf",e.errorMsg),t.xp6(1),t.Q6J("ngClass",t.WLB(21,V,e.isPending,e.isApproved)),t.xp6(1),t.Q6J("ngIf",e.isPending),t.xp6(2),t.hij(" ",t.lcZ(25,19,"Update")," "),t.xp6(2),t.Q6J("ngIf",e.isPending),t.xp6(1),t.Q6J("ngIf",e.isApproved)}}function Y(n,s){if(1&n&&(t.TgZ(0,"p",15),t._uU(1),t.ALo(2,"translate"),t._UZ(3,"br"),t._uU(4),t.ALo(5,"translate"),t.TgZ(6,"strong"),t._uU(7),t.qZA(),t._UZ(8,"br"),t._uU(9),t.ALo(10,"translate"),t.TgZ(11,"strong"),t._uU(12),t.qZA(),t._uU(13,". "),t.qZA()),2&n){const e=t.oxw(2);t.xp6(1),t.hij(" ",t.lcZ(2,5,"Do you want to approve this Rendezvous?"),""),t.xp6(3),t.hij(" - ",t.lcZ(5,7,"Name:")," "),t.xp6(3),t.Oqu(null==e.rdv?null:e.rdv.displayName),t.xp6(2),t.hij(" - ",t.lcZ(10,9,"Created in:")," "),t.xp6(3),t.Oqu(null==e.rdv?null:e.rdv.createdAt)}}function L(n,s){if(1&n&&(t.TgZ(0,"p",21),t._uU(1),t.qZA()),2&n){const e=t.oxw(2);t.xp6(1),t.Oqu(e.errorMsg)}}const G=function(n){return{"input-alert":n}};function F(n,s){if(1&n){const e=t.EpF();t.TgZ(0,"div",9)(1,"div",10)(2,"div",11),t._uU(3),t.ALo(4,"translate"),t.qZA(),t.TgZ(5,"div",13),t.NdJ("click",function(){t.CHM(e);const r=t.oxw();return t.KtG(r.hidePopup())}),t.ALo(6,"translate"),t._uU(7," \xd7 "),t.qZA()(),t.TgZ(8,"div",14),t.YNc(9,Y,14,11,"p",24),t.TgZ(10,"label",25),t._uU(11),t.ALo(12,"translate"),t.qZA(),t._UZ(13,"br")(14,"input",26,27),t.YNc(16,L,2,1,"p",16),t.TgZ(17,"div",28)(18,"button",22),t.NdJ("click",function(){t.CHM(e);const r=t.MAs(15),i=t.oxw();return t.KtG(i.approveRDV(i.rdv,r.value))}),t._uU(19),t.ALo(20,"translate"),t.qZA()()()()}if(2&n){const e=t.oxw();t.xp6(3),t.hij(" ",t.lcZ(4,7,"Approve Rendezvous")," "),t.xp6(2),t.s9C("title",t.lcZ(6,9,"Cancel")),t.xp6(4),t.Q6J("ngIf",e.rdv),t.xp6(2),t.Oqu(t.lcZ(12,11,"Please add a Date:")),t.xp6(3),t.Q6J("ngClass",t.VKq(15,G,e.errorMsg)),t.xp6(2),t.Q6J("ngIf",e.errorMsg),t.xp6(3),t.hij(" ",t.lcZ(20,13,"Approve")," ")}}function K(n,s){if(1&n&&(t.TgZ(0,"p",21),t._uU(1),t.qZA()),2&n){const e=t.oxw(2);t.xp6(1),t.Oqu(e.errorMsg)}}function j(n,s){if(1&n){const e=t.EpF();t.TgZ(0,"div",9)(1,"div",10)(2,"div",11),t._uU(3),t.ALo(4,"translate"),t.qZA(),t.TgZ(5,"div",13),t.NdJ("click",function(){t.CHM(e);const r=t.oxw();return t.KtG(r.hidePopup())}),t.ALo(6,"translate"),t._uU(7," \xd7 "),t.qZA()(),t.TgZ(8,"div",14)(9,"app-rdv-form",29),t.NdJ("rdvFormValue",function(r){t.CHM(e);const i=t.oxw();return t.KtG(i.updateRendezvous(r))}),t.qZA(),t.YNc(10,K,2,1,"p",16),t.qZA()()}if(2&n){const e=t.oxw();t.xp6(3),t.hij(" ",t.lcZ(4,5,"Update Rendezvous")," "),t.xp6(2),t.s9C("title",t.lcZ(6,7,"Cancel")),t.xp6(4),t.Q6J("rdv",e.rdv)("showDeleteBtn",!1),t.xp6(1),t.Q6J("ngIf",e.errorMsg)}}function H(n,s){if(1&n&&(t.TgZ(0,"div",30),t._UZ(1,"app-chart",31),t.ALo(2,"translate"),t.qZA()),2&n){const e=t.oxw();t.xp6(1),t.s9C("chartTitle",t.lcZ(2,5,"New Rendezvous Per Month")),t.Q6J("chartX",e.months)("chartY",e.rdvsPerMonth)("chartType","bar")("chartID","rdvsChart")}}function B(n,s){if(1&n){const e=t.EpF();t.TgZ(0,"div",32),t.NdJ("click",function(){t.CHM(e);const r=t.oxw();return t.KtG(r.hidePopup())}),t.qZA()}}let X=(()=>{class n{constructor(e,o,r,i){this.authService=e,this.rdvService=o,this.translate=r,this.translatingService=i,this.pendingRDVsCols=this.translatingService.getPendingRDVsCols(),this.approvedRDVsCols=this.translatingService.getApprovedRDVsCols(),this.halfwayPopup=!1,this.updateRDVpopup=!1,this.approveRDVpopup=!1,this.rdv=null,this.errorMsg="",this.months=this.translatingService.getMonths()}ngOnInit(){this.authService.getUser().subscribe(e=>this.user=e),this.approvedRendezvous=this.rdvService.getRDVsByState(u.R.APPROVED,"rdvDate","BEGINNING"),this.pendingRendezvous=this.rdvService.getRDVsByState(u.R.PENDING,"createdAt","BEGINNING"),this.rdvService.getAllRendezvous().subscribe(e=>{const o=e.map(r=>new Date(r.createdAt).toLocaleString("en",{month:"short"}));this.rdvsPerMonth=this.translatingService.getEngMonths().map(r=>o.filter(i=>i==r).length)})}get isPending(){return this.rdv?.rdvState===u.R.PENDING}get isApproved(){return this.rdv?.rdvState===u.R.APPROVED}showHalfwayPopup(e){this.rdv=e,this.halfwayPopup=!0}proceedToApproveRDV(){this.halfwayPopup=!1,this.updateRDVpopup=!1,this.approveRDVpopup=!0}proceedToUpdateRDV(){this.halfwayPopup=!1,this.approveRDVpopup=!1,this.updateRDVpopup=!0}hidePopup(){this.approveRDVpopup=!1,this.updateRDVpopup=!1,this.halfwayPopup=!1,this.errorMsg="",this.rdv=null}approveRDV(e,o){var r=this;return(0,d.Z)(function*(){if(!o)return r.errorMsg="Please enter a date";if(!e)return r.errorMsg="Rendezvous not found";e.rdvDate=new Date(o);try{return yield r.rdvService.approveRendezvous(e.rdvID,e,r.user),r.hidePopup()}catch(i){r.errorMsg=i}})()}updateRendezvous(e){var o=this;return(0,d.Z)(function*(){if(!o.rdv?.rdvID)return o.errorMsg="Rendezvous not found";if(e.displayName===o.rdv.displayName&&e.phoneNumber===o.rdv.phoneNumber)return o.hidePopup();try{return yield o.rdvService.updateRendezvous(o.rdv.rdvID,e),o.hidePopup()}catch(r){o.errorMsg=r}})()}deleteRendezvous(){var e=this;return(0,d.Z)(function*(){if(!e.rdv?.rdvID)return e.errorMsg="Rendezvous ID not found";if(confirm(e.translatingService.getDeleteConfirmMsg(e.rdv)))try{return yield e.rdvService.deleteRendezvous(e.rdv.rdvID,e.rdv,e.user),e.hidePopup()}catch(o){e.errorMsg=o}})()}cancelRendezvous(){var e=this;return(0,d.Z)(function*(){if(!e.rdv?.rdvID)return e.errorMsg="Rendezvous ID not found";if(confirm(e.translatingService.getCancelConfirmMsg(e.rdv)))try{return yield e.rdvService.cancelRendezvous(e.rdv.rdvID,e.rdv,e.user),e.hidePopup()}catch(o){e.errorMsg=o}})()}}return n.\u0275fac=function(e){return new(e||n)(t.Y36(f.e),t.Y36(U.b),t.Y36(p.sK),t.Y36(m.o))},n.\u0275cmp=t.Xpm({type:n,selectors:[["app-rendezvous"]],decls:10,vars:11,consts:[[1,"rdvs-container"],["class","table-container facebook-style",4,"ngIf"],["class","popup-modal facebook-style",4,"ngIf"],["class","chart-container facebook-style",4,"ngIf"],["class","overlay",3,"click",4,"ngIf"],[1,"table-container","facebook-style"],[1,"t-title-container"],[1,"t-title"],[3,"tableCols","infos","showBtns","currentUser","updateInfosEvent"],[1,"popup-modal","facebook-style"],[1,"popup-modal-header"],[1,"title"],[4,"ngIf"],[1,"close-btn",3,"title","click"],[1,"popup-modal-body"],[2,"margin","15px 0 30px 0"],["class","alert alert-danger",4,"ngIf"],[1,"halfway-btns-container",3,"ngClass"],["class","btn btn-success",3,"click",4,"ngIf"],[1,"btn","btn-info",3,"click"],["class","btn btn-danger",3,"click",4,"ngIf"],[1,"alert","alert-danger"],[1,"btn","btn-success",3,"click"],[1,"btn","btn-danger",3,"click"],["style","margin: 15px 0 30px 0;",4,"ngIf"],["for","rdv-date",2,"font-size","small"],["type","datetime-local","name","rdv-date",1,"form-control",3,"ngClass"],["rdvDateInput",""],[1,"btns-container"],[3,"rdv","showDeleteBtn","rdvFormValue"],[1,"chart-container","facebook-style"],[3,"chartX","chartY","chartType","chartTitle","chartID"],[1,"overlay",3,"click"]],template:function(e,o){1&e&&(t.TgZ(0,"div",0),t.YNc(1,N,7,9,"div",1),t.ALo(2,"async"),t.YNc(3,z,7,9,"div",1),t.ALo(4,"async"),t.YNc(5,Q,28,24,"div",2),t.YNc(6,F,21,17,"div",2),t.YNc(7,j,11,9,"div",2),t.YNc(8,H,3,7,"div",3),t.qZA(),t.YNc(9,B,1,0,"div",4)),2&e&&(t.xp6(1),t.Q6J("ngIf",t.lcZ(2,7,o.pendingRendezvous)),t.xp6(2),t.Q6J("ngIf",t.lcZ(4,9,o.approvedRendezvous)),t.xp6(2),t.Q6J("ngIf",o.halfwayPopup),t.xp6(1),t.Q6J("ngIf",o.approveRDVpopup),t.xp6(1),t.Q6J("ngIf",o.updateRDVpopup),t.xp6(1),t.Q6J("ngIf",o.rdvsPerMonth),t.xp6(1),t.Q6J("ngIf",o.halfwayPopup||o.approveRDVpopup||o.updateRDVpopup))},dependencies:[c.mk,c.O5,x.a,I.X,C,c.Ov,p.X$],styles:[".rdvs-container[_ngcontent-%COMP%]{position:relative;min-height:100vh}.cols-3[_ngcontent-%COMP%]{display:grid;grid-template-columns:1fr 1fr 1fr;gap:15px;margin-top:15px}.cols-2[_ngcontent-%COMP%]{display:grid;grid-template-columns:1fr 1fr;gap:15px;margin-top:15px}.btns-container[_ngcontent-%COMP%]{margin-top:15px}.btn-success[_ngcontent-%COMP%]{width:100%}.chart-container[_ngcontent-%COMP%]{padding:15px;max-width:90%;margin-inline:auto}@media screen and (max-width: 950px){.chart-container[_ngcontent-%COMP%]{max-width:100%}}"]}),n})();function $(n,s){1&n&&(t.TgZ(0,"mat-icon",13),t.ALo(1,"translate"),t._uU(2,"menu"),t.qZA()),2&n&&t.s9C("title",t.lcZ(1,1,"Show Sidebar"))}function W(n,s){if(1&n){const e=t.EpF();t.TgZ(0,"span",17),t.NdJ("click",function(){t.CHM(e);const r=t.oxw(2);return t.KtG(r.toggleSidebar())}),t.ALo(1,"translate"),t._uU(2,"\xd7"),t.qZA()}2&n&&t.s9C("title",t.lcZ(1,1,"Cancel"))}const tt=function(n,s){return{"show-sidemenu":n,"hide-sidemenu":s}},h=function(n){return{active:n}};function et(n,s){if(1&n){const e=t.EpF();t.TgZ(0,"div",14)(1,"div",4),t.YNc(2,W,3,3,"span",15),t.qZA(),t.TgZ(3,"div",16),t.NdJ("click",function(){t.CHM(e);const r=t.oxw();return t.KtG(r.showUsers())}),t._uU(4),t.ALo(5,"translate"),t.qZA(),t.TgZ(6,"div",16),t.NdJ("click",function(){t.CHM(e);const r=t.oxw();return t.KtG(r.showRDVs())}),t._uU(7),t.ALo(8,"translate"),t.qZA()()}if(2&n){const e=t.oxw();t.Q6J("ngClass",t.WLB(10,tt,e.showSidebar,!e.showSidebar)),t.xp6(2),t.Q6J("ngIf",e.showSidebar),t.xp6(1),t.Q6J("ngClass",t.VKq(13,h,e.usersON)),t.xp6(1),t.hij(" ",t.lcZ(5,6,"Users")," "),t.xp6(2),t.Q6J("ngClass",t.VKq(15,h,e.RDVsON)),t.xp6(1),t.hij(" ",t.lcZ(8,8,"Rendezvous")," ")}}function nt(n,s){if(1&n){const e=t.EpF();t.TgZ(0,"div",18),t.NdJ("click",function(){t.CHM(e);const r=t.oxw();return t.KtG(r.toggleSidebar())}),t.qZA()}}function ot(n,s){1&n&&(t.TgZ(0,"div",19),t._UZ(1,"app-users-part"),t.qZA())}function rt(n,s){1&n&&(t.TgZ(0,"div",20),t._UZ(1,"app-rendezvous"),t.qZA())}let st=(()=>{class n{constructor(){this.showSidebar=!1,this.usersON=!0,this.RDVsON=!1}ngOnInit(){}toggleSidebar(){this.showSidebar=!this.showSidebar}showUsers(){this.RDVsON=!1,this.usersON=!0,this.showSidebar=!1}showRDVs(){this.usersON=!1,this.RDVsON=!0,this.showSidebar=!1}}return n.\u0275fac=function(e){return new(e||n)},n.\u0275cmp=t.Xpm({type:n,selectors:[["app-dashboard"]],decls:18,vars:17,consts:[[1,"dashboard-container"],[1,"sidebar"],[1,"fixed"],[1,"web-sidemenu-container"],[1,"toggle-sidebar"],[3,"click"],[3,"title",4,"ngIf"],[1,"web-side-links",3,"ngClass","click"],["class","mobile-sidemenu-container",3,"ngClass",4,"ngIf"],["class","overlay",3,"click",4,"ngIf"],[1,"main-content"],["class","users-container",4,"ngIf"],["class","rdvs-container",4,"ngIf"],[3,"title"],[1,"mobile-sidemenu-container",3,"ngClass"],["class","close-btn",3,"title","click",4,"ngIf"],[1,"mobile-side-link",3,"ngClass","click"],[1,"close-btn",3,"title","click"],[1,"overlay",3,"click"],[1,"users-container"],[1,"rdvs-container"]],template:function(e,o){1&e&&(t.TgZ(0,"div",0)(1,"div",1)(2,"div",2)(3,"div",3)(4,"div",4)(5,"span",5),t.NdJ("click",function(){return o.toggleSidebar()}),t.YNc(6,$,3,3,"mat-icon",6),t.qZA()(),t.TgZ(7,"div",7),t.NdJ("click",function(){return o.showUsers()}),t._uU(8),t.ALo(9,"translate"),t.qZA(),t.TgZ(10,"div",7),t.NdJ("click",function(){return o.showRDVs()}),t._uU(11),t.ALo(12,"translate"),t.qZA()()(),t.YNc(13,et,9,17,"div",8),t.YNc(14,nt,1,0,"div",9),t.qZA(),t.TgZ(15,"div",10),t.YNc(16,ot,2,0,"div",11),t.YNc(17,rt,2,0,"div",12),t.qZA()()),2&e&&(t.xp6(6),t.Q6J("ngIf",!o.showSidebar),t.xp6(1),t.Q6J("ngClass",t.VKq(13,h,o.usersON)),t.xp6(1),t.hij(" ",t.lcZ(9,9,"Users")," "),t.xp6(2),t.Q6J("ngClass",t.VKq(15,h,o.RDVsON)),t.xp6(1),t.hij(" ",t.lcZ(12,11,"Rendezvous")," "),t.xp6(2),t.Q6J("ngIf",o.showSidebar),t.xp6(1),t.Q6J("ngIf",o.showSidebar),t.xp6(2),t.Q6J("ngIf",o.usersON),t.xp6(1),t.Q6J("ngIf",o.RDVsON))},dependencies:[c.mk,c.O5,_.Hw,D,X,p.X$],styles:[".dashboard-container[_ngcontent-%COMP%]{min-height:100vh;display:grid;grid-template-columns:max-content auto}.sidebar[_ngcontent-%COMP%]{position:relative;width:max-content;color:#fff;background-color:#121212}.fixed[_ngcontent-%COMP%]{position:sticky;top:55px;height:max-content}.toggle-sidebar[_ngcontent-%COMP%]{display:none}.web-side-links[_ngcontent-%COMP%]{padding:15px;cursor:pointer}.web-side-links[_ngcontent-%COMP%]:hover{filter:brightness(75%)}.active[_ngcontent-%COMP%]{color:var(--main-color);background-color:var(--side-color)}.main-content[_ngcontent-%COMP%]{overflow:hidden;padding:15px}@media screen and (max-width: 950px){.mobile-side-links[_ngcontent-%COMP%], .web-side-links[_ngcontent-%COMP%], .hide-sidemenu[_ngcontent-%COMP%]{display:none}.show-sidemenu[_ngcontent-%COMP%]{position:fixed;top:55px;left:0;width:max-content;height:100%;background-color:#000;z-index:11}.toggle-sidebar[_ngcontent-%COMP%]{display:flex;justify-content:flex-end}.toggle-sidebar[_ngcontent-%COMP%] > span[_ngcontent-%COMP%]{width:30px;height:30px;display:flex;justify-content:center;align-items:center;cursor:pointer}.close-btn[_ngcontent-%COMP%]{font-size:2rem;font-weight:700}.mobile-side-link[_ngcontent-%COMP%]{padding:15px;cursor:pointer}}"]}),n})();var it=a(7767);const at=[{path:"",component:st,canActivate:[b.a,it.u]}];let ct=(()=>{class n{}return n.\u0275fac=function(e){return new(e||n)},n.\u0275mod=t.oAB({type:n}),n.\u0275inj=t.cJS({imports:[g.Bz.forChild(at),g.Bz]}),n})();var dt=a(9552);let pt=(()=>{class n{}return n.\u0275fac=function(e){return new(e||n)},n.\u0275mod=t.oAB({type:n}),n.\u0275inj=t.cJS({imports:[c.ez,ct,dt.m,l.u5,_.Ps]}),n})()}}]);