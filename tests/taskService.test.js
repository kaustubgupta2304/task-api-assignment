const service = require('../src/services/taskService');
beforeEach(()=>service._reset());
describe('taskService',()=>{
  test('creates a task with defaults',()=>{const t=service.create({title:'Test'}); expect(t.title).toBe('Test'); expect(t.status).toBe('todo'); expect(t.priority).toBe('medium'); expect(t.completedAt).toBeNull(); expect(t.id).toBeTruthy();});
  test('getAll returns a copy of the task list',()=>{service.create({title:'A'}); const all=service.getAll(); all.pop(); expect(service.getAll()).toHaveLength(1);});
  test('findById returns task or undefined',()=>{const t=service.create({title:'A'}); expect(service.findById(t.id)).toEqual(t); expect(service.findById('missing')).toBeUndefined();});
  test('filters by exact status',()=>{service.create({title:'A',status:'todo'}); service.create({title:'B',status:'done'}); expect(service.getByStatus('todo')).toHaveLength(1);});
  test('paginates from first item on page one',()=>{service.create({title:'A'});service.create({title:'B'});service.create({title:'C'});expect(service.getPaginated(1,2).map(t=>t.title)).toEqual(['A','B']);});
  test('paginates later pages',()=>{service.create({title:'A'});service.create({title:'B'});service.create({title:'C'});expect(service.getPaginated(2,2).map(t=>t.title)).toEqual(['C']);});
  test('updates an existing task',()=>{const t=service.create({title:'A'}); expect(service.update(t.id,{title:'B'}).title).toBe('B');});
  test('update missing task returns null',()=>expect(service.update('x',{title:'B'})).toBeNull());
  test('remove returns false for missing task',()=>expect(service.remove('x')).toBe(false));
  test('completeTask marks task done and preserves priority',()=>{const t=service.create({title:'A',priority:'high'}); const done=service.completeTask(t.id); expect(done.status).toBe('done'); expect(done.priority).toBe('high'); expect(done.completedAt).toEqual(expect.any(String));});
  test('stats counts statuses and overdue tasks',()=>{service.create({title:'A',status:'todo',dueDate:'2000-01-01T00:00:00.000Z'});service.create({title:'B',status:'done',dueDate:'2000-01-01T00:00:00.000Z'});expect(service.getStats()).toEqual({todo:1,in_progress:0,done:1,overdue:1});});
  test('assigns a task',()=>{const t=service.create({title:'A'});expect(service.assign(t.id,'Kaustub').assignee).toBe('Kaustub');});
});
