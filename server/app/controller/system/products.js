// 定义创建接口的请求参数规则
const createRule = {
  label: 'string',
  categorieId: {type: 'number', required: false},
  name: 'string',
  icon: {type: 'string', required: false},
  link: {type: 'string'},
  description: {type: 'string', required: false},
  defaultSort: {type: 'number', required: false},
};

const updateRule = {
  id: {type: 'number', min: 1},
  label: {type: 'string', required: false},
  categorieId: {type: 'number', required: false},
  name: {type: 'string', required: false},
  icon: {type: 'string', required: false},
  link: {type: 'string', required: false},
  description: {type: 'string', required: false},
  defaultSort: {type: 'number', required: false},
  isEnabled: {type: 'number', min: 0, max: 1, required: false}
};

module.exports = app => {
  return class ProductController extends app.BaseController {

    * index (ctx) {
      const products = yield ctx.service.system.products.all();
      this.success({
        products
      });
    }

    * create (ctx) {
      ctx.validate(createRule);

      // 检查同名label
      const row = yield ctx.service.system.products.findByLabel(ctx.request.body.label);
      if (row) {
        this.error('REST_CREATE_ERROR', `存在同名关键词 '${row['label']}'`);
        return;
      }
      const body = ctx.request.body;
      body['optUser'] = ctx.auth.username;
      const id = yield ctx.service.system.products.create(ctx.request.body);
      if (id) {
        this.success({
          id
        });
      } else {
        this.error('REST_CREATE_ERROR', '功能类目创建失败');
      }
    }

    * update (ctx) {
      const data = ctx.request.body;
      data['id'] = Number(ctx.params.id); 
      ctx.validate(updateRule, data);
      const row = ctx.helper.filterObj(data, ['id', 'categorieId', 'label', 'name', 'icon', 'link', 'description', 'defaultSort', 'isEnabled', 'optUser']);
      row['optUser'] = ctx.auth.username;

      const result = yield ctx.service.system.products.update(row);
      if (result) {
        this.success(yield ctx.service.system.products.find(row['id']));
      } else {
        this.error(REST_UPDATE_ERROR, '功能类目更新失败');
      }
    }

    * destroy (ctx) {
      const id = Number(ctx.params.id);
      ctx.validate({id: 'number'}, {id});
      const result = yield ctx.service.system.products.destroy(id);
      if (result) {
        this.success();
      } else {
        this.error(REST_DELETE_ERROR, '功能类目不存在或已删除');
      }
    }
  }
}
