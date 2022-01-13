import React from "react";

class EditContact extends React.Component {
  constructor(props) {
    super(props);
    const { id, name, email, isFriend } = props.location.state.contact;
    this.state = {
      id,
      name,
      email,
      isFriend
    };
  }

  update = (e) => {
    e.preventDefault();
    if (this.state.name === "" || this.state.email === "") {
      alert("ALl the fields are mandatory!");
      return;
    }
    this.props.updateContactHandler(this.state);
    this.setState({ name: "", email: "", isFriend: false });
    this.props.history.push("/");
  };
  render() {
    return (
      <div className="ui main">
        <h2>Edit Contact</h2>
        <form className="ui form" onSubmit={this.update}>
          <div className="field">
            <label>Name</label>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={this.state.name}
              onChange={(e) => this.setState({ name: e.target.value })}
            />
          </div>
          <div className="field">
            <label>Email</label>
            <input
              type="text"
              name="email"
              placeholder="Email"
              value={this.state.email}
              onChange={(e) => this.setState({ email: e.target.value })}
            />
          </div>
          <div class="ui checkbox">
              <input type="checkbox" 
               name="example" 
               value={this.state.isFriend}
               onChange={(e) => this.setState({isFriend: true})}
               />
              <label>Is this person your friend?</label>
            </div>
         <div> <button className="ui button blue"
                       style={{ marginTop: "15px" }}>Update</button> </div>
        </form>
      </div>
    );
  }
}

export default EditContact;
