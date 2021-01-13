//得到登录的角色类型，和用户有的角色类型
let roleTypeMap = [
  { code: '10', name: '企业' },
  { code: '20', name: '监管机构' },
  { code: '30', name: '溯源服务商' },
  { code: '40', name: '第三方数据平台' },
  { code: '60', name: '个人' },
  { code: '600001', name: '消费者' }
];

export function getLoginRoleType(code, codes, usertype) {
  let roleType;
  let role = roleTypeMap.find(item => {
    if (item.code == code) {
      return true;
    }
  });
  if (usertype == 60) {
    role = { code: '60', name: '个人' };
    code = 60;
  }
  let codesArr = codes.split(',');
  let roles = roleTypeMap.filter(item => {
    if (codesArr.includes(item.code)) {
      return true;
    }
  });
  //转化登录类型
  if (role) {
    if (code == '10') {
      roleType = 'enterprise';
    }
    if (code == '20') {
      roleType = 'supervise';
    }
    if (code == '30') {
      roleType = 'service';
    }
    if (code == '60') {
      roleType = 'consumer';
    }
    if (code == '600001') {
      roleType = 'consumer';
    }
  }

  return {
    roleType,
    role,
    roles
  };
}
