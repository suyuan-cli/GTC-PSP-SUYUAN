export const statusconfig = {
         // 状态为特殊码表 状态的编码过滤参数有专门的配置表 statusconfig.js 必填
         // 状态编码过滤参数 必填 (注：过滤参数是一个对象)
         ogcodeapply: {
           code: '90.status',
           key: 'ogcodeapply',
           codeparams: {
             sheetcode: 'GTC-MGRTB.OgcodeApply',
             SQLFILTER: "code <> '10'"
           }
         },
         ogcodeapplyAll: {
           code: '90.status',
           key: 'ogcodeapply',
           codeparams: {
             sheetcode: 'GTC-MGRTB.OgcodeApply'
           }
         },
         ogcodeapplyOwn: {
           code: '90.status',
           key: 'ogcodeapply',
           codeparams: {
             sheetcode: 'GTC-MGRTB.OgcodeApply',
             SQLFILTER: "code in ('30','70','80')"
           }
         },
         goodsregister: {
           code: '90.status',
           key: 'ogcodeapply',
           codeparams: {
             sheetcode: 'GTC-MGRTB.CargoReg'
           }
         },
         ogcodeBind: {
           code: '90.status',
           key: 'ogcodeBind',
           codeparams: {
             sheetcode: 'GTC-MGRTB.OgcodeBind'
           }
         },
         ogcodedisable: {
           code: '90.status',
           key: 'ogcodedisable',
           codeparams: {
             sheetcode: 'DT_GTC-MGRPF.exhandleresult'
           }
         },
         complaintconsultinfo: {
           code: '90.status',
           key: 'complaintconsultinfo',
           codeparams: {
             sheetcode: 'GTC-MGRPF.Cumercompconsult'
           }
         },
         complaintconsultinfo_1: {
           code: '90.status',
           key: 'complaintconsultinfo_1',
           codeparams: {
             sheetcode: 'GTC-MGRPF.Cumercompconsult_1'
           }
         },

         //举报状态
         reportstatusinfo: {
           code: '90.status',
           key: 'reportstatusinfo',
           codeparams: {
             sheetcode: 'GTC-MGRPF.Reportinfo',
             SQLFILTER: "code != '10'"
           }
         },
         //举报类型
         reporttypeinfo: {
           code: '90.status',
           key: 'reporttypeinfo',
           codeparams: {
             sheetcode: 'DT_GTC-MGRMGR.reporttype'
           }
         },
         //需求类型
         demandtypeinfo: {
           code: '90.status',
           key: 'demandtypeinfo',
           codeparams: {
             sheetcode: 'GTC-MGRCBM.Desiredreg'
           }
         },
         //风险状态
         rmRiskReportInfo: {
           code: '90.status',
           key: 'rmRiskReportInfo',
           codeparams: {
             sheetcode: 'GTC-MGRRM.RmRiskReportInfo'
           }
         },
         // 企业商事信息状态
         entmercialreg: {
           code: '90.status',
           key: 'entmercialreg',
           codeparams: {
             sheetcode: 'GTC-MGRCBM.Entmercialreg',
             SQLFILTER: "code <> '10'"
           }
         },
         // 商品溯源数据列表状态
         traceSourceList: {
           code: '90.status',
           key: 'traceSourceList',
           codeparams: {
             sheetcode: 'GTC-MGRTB.CargoMaint'
           }
         },
         // 溯源商品数据传输状态
         OgCargoDataTrans: {
           code: '90.status',
           key: 'OgCargoDataTrans',
           codeparams: {
             sheetcode: 'GTC-MGRTB.OgCargoDataTrans'
           }
         },
         // 商品召回状态
         cargorecall: {
           code: '90.status',
           key: 'cargorecall',
           codeparams: {
             sheetcode: 'GTC-MGRTB.CargoRecall'
           }
         },
         // 我收到的申请状态
         ogcodeapplys: {
           code: '90.status',
           key: 'ogcodeapplys',
           codeparams: {
             sheetcode: 'GTC-MGRTB.OgcodeApply',
             SQLFILTER: "code > '30'"
           }
         },

         //  需求状态
         demandStatus: {
           code: '90.status',
           key: 'demandStatus',
           codeparams: {
             sheetcode: 'GTC-MGRCBM.Desiredreg',
             SQLFILTER: "code != '10'"
           }
         },
         //  咨询应答状态
         responseInquiry: {
           code: '90.status',
           key: 'responseInquiry',
           codeparams: {
             sheetcode: 'GTC-MGRPF.ConsultValidation',
             SQLFILTER: "code != '10'"
           }
         },
         //  企业投诉状态
         complainandadvisorylist: {
           code: '90.status',
           key: 'complainandadvisorylist',
           codeparams: {
             sheetcode: 'GTC-MGRPF.Compconsult',
             SQLFILTER: "code != '10'"
           }
         },
        //  发布状态
        poststatus: {
           code: '90.status',
           key: 'poststatus',
           codeparams: {
             sheetcode: 'GTC-MGRRM.RiskWarningInfo',
             SQLFILTER: "code != '10'"
           }
         }
       };
