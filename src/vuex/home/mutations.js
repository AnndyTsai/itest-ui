export default {
    changeActiveProject(state, newProject){
        state.activeProject = newProject;
        return true;
    },
    setProjectList(state, projectList){
        state.projectList = projectList;
        return true;
    }
}
