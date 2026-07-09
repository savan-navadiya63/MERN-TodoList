import EmptyState from "./EmptyState.jsx";
import TodoItem from "./TodoItem.jsx";

function TaskList({
  todos,
  loading,
  editingId,
  editingTitle,
  onEditingTitleChange,
  onStartEditing,
  onCancelEditing,
  onSaveEdit,
  onToggleTodo,
  onDeleteTodo,
}) {
  if (loading) {
    return (
      <div className="mt-5">
        <EmptyState text="Loading tasks..." />
      </div>
    );
  }

  if (todos.length === 0) {
    return (
      <div className="mt-5">
        <EmptyState text="No matching tasks yet." />
      </div>
    );
  }

  return (
    <div className="mt-5 grid gap-3">
      {todos.map((todo) => (
        <TodoItem
          key={todo._id}
          todo={todo}
          editingId={editingId}
          editingTitle={editingTitle}
          onEditingTitleChange={onEditingTitleChange}
          onStartEditing={onStartEditing}
          onCancelEditing={onCancelEditing}
          onSaveEdit={onSaveEdit}
          onToggleTodo={onToggleTodo}
          onDeleteTodo={onDeleteTodo}
        />
      ))}
    </div>
  );
}

export default TaskList;
