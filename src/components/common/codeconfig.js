import { dictionaryconfig } from '@/components/common/dictionaryconfig';
export const codeconfig = {
  // 码表配置表
  ccode: {
    // 码表名称
    title: '企业',
    // 码表编码 必填
    code: 'GTC-MGRPF.ccode',
    // 编码过滤参数 选填
    codeparams: {}
  },
  ccoderequesterrela: {
    title: '标识服务商',
    code: 'GTC-MGRPF.ccoderequesterrela'
    // codeparams: { ccodetype: '300003' }
  },
  ncode: {
    title: '原产国/地区',
    code: 'GTC-MGRTB.ncode',
    codeparams: {}
  },
  // 或 可能影响区域
  chinaNcode: {
    title: '原产国/地区',
    code: 'GTC-MGRTB.ncode'
    // codeparams: { SQLFILTER: 'nocde = 990001' }
  },

  country: {
    title: '国别',
    code: 'GTC-MGRTB.ncodec',
    codeparams: {}
  },
  ccoderequesterrela_all: {
    title: '公证机构',
    // 编码过滤参数 选填
    codeparams: { ccodetype: 300009 },
    code: 'GTC-MGRPF.ccoderequesterrela'
  },
  fcode: {
    title: '币种',
    code: 'GTC-MGRTB.fcode'
  },
  doctype: {
    title: '附件类型',
    code: 'SN-PLAT.DocType',
    codeparams: {
      sheetcode: 'GTC-MGRTB.CcodeReg'
    }
  },
  doctypelink: {
    title: '附件类型(环节信息)',
    code: 'SN-PLAT.DocType',
    codeparams: {
      sheetcode: 'GTC-MGRTB.SelfDeclare'
    }
  },
  ccodes: {
    // 检测机构
    title: '检测机构',
    // 码表编码 必填
    code: 'GTC-MGRPF.ccode',
    // 编码过滤参数 选填
    codeparams: { cbmsubtype: '300001' }
  },
  ccode_launch: {
    // 发起企业
    title: '发起企业',
    // 码表编码 必填
    code: 'GTC-MGRPF.pfccode',
    // 编码过滤参数 选填
    // codeparams: { SQLFILTER: "ccodetype in ('10')" }
    codeparams: { SQLFILTER: "ccodetype in ('10','20')" }
  },
  entmercialreg: {
    title: '企业商事信息状态',
    code: 'GTC-MGRCBM.Entmercialreg'
  },
  risklevel: {
    title: '风险等级',
    code: 'GTC-MGRRM.riskbasicinfo',
    codeparams: { riskbasicinfotype: '100' }
  },
  riskReporting: {
    title: '上报用户',
    code: 'GTC-MGRPF.ccode',
    codeparams: { cbmtype: '10,20' }
  },
  ccodesup: {
    // 码表名称
    title: '监管机构',
    // 码表编码 必填
    code: 'GTC-MGRPF.pfccode',
    // 编码过滤参数 选填
    codeparams: { SQLFILTER: "ccodetype in ('20')" }
  },
  pfccode10: {
    // 码表名称
    title: '仅企业',
    // 码表编码 必填
    code: 'GTC-MGRPF.pfccode',
    key: 'pfccode10',
    // 编码过滤参数 选填
    codeparams: { SQLFILTER: "ccodetype in ('10')" }
  },
  gwcode: {
    title: '岗位码表',
    code: 'GTC-MGRPF.sungwcode'
  },
  entrustccode: {
    // 发起企业
    title: '委托服务商',
    // 码表编码 必填
    code: 'GTC-MGRPF.pfccode',
    key: 'entrustccode',
    // 编码过滤参数 选填
    codeparams: { SQLFILTER: "ccodetype = '30'" }
  },
  servicetype: {
    // 发起企业
    title: '评价对象',
    // 码表编码 必填
    code: 'GTC-MGRPF.pfccode'
  },
  cobuilder: {
    title: '共建方类型',
    code: 'GTC-MGRTB.cbmdef',
    codeparams: {
      SQLFILTER: "cbmdefcode in ('10','20','30','40','70','90')  and relatype='CT'"
    }
  },
  subclass: {
    title: '用户子类',
    code: 'GTC-MGRTB.cbmdef',
    key: 'sdfsdf',
    codeparams: {
      SQLFILTER: "relatype='CST'"
    }
  },
  receiveuser: {
    title: '选择接收用户',
    code: 'GTC-MGRTB.cbmdef',
    key: 'receiveuser',
    codeparams: {
      SQLFILTER: "relatype='CT' and cbmdefcode <> '80' "
    },
    type: '全部'
  },
  ccodetype: {
    title: '共建方组织类型',
    code: 'GTC-MGRTB.cbmdef'
  },
  users: {
    title: '用户',
    code: 'users',
    codeparams: {}
  },
  ccode_target: {
    // 企业，服务商
    title: '投诉对象',
    // 码表编码 必填
    code: 'GTC-MGRPF.pfccode',
    // 编码过滤参数 选填
    // codeparams: { SQLFILTER: "ccodetype in ('10')" }
    codeparams: { SQLFILTER: "ccodetype in ('10','30')" }
  },
  cbmcatq: {
    title: '共建方类别',
    code: 'GTC-MGRTB.cbmdef',
    codeparams: {
      SQLFILTER: "relatype='CC'"
    }
  },

  caution: {
    title: '警示',
    code: 'caution'
  },
  recommend: {
    title: '推荐',
    code: 'recommend'
  },
  grade: {
    title: '服务商等级',
    code: 'grade'
  },

  rflags: {
    title: '实名认证',
    code: 'rflags'
  },
  hflags: {
    title: '高频次用户',
    code: 'hflags'
  },

  /** 风险规则引擎 */
  risktarget: {
    title: '风险指标',
    code: 'GTC-MGRRM.queryriskcategdef',
    key: 'FXLB001'
  },
  risktarget2: {
    title: '风险指标',
    code: 'GTC-MGRRM.queryriskbaseinfo',
    key: null,
    codeparams: {
      riskbasicinfotype: '900',
      riskbasicinfopcode: null
    }
  },
  disposeCode: {
    title: '风险处置',
    code: 'GTC-MGRRM.queryriskbaseinfo',
    key: 700,
    codeparams: {
      riskbasicinfotype: '700'
    }
  },
  /** 风险规则引擎结束 */

  /** 信息发布 */
  site: {
    title: '内容发布平台',
    code: 'SN-CMS.site',
  },
  articleStatus: {
    title: '文章状态',
    code: 'DT_SN-CMS.articleStatus',
  },
};
