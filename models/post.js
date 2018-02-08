module.exports = function(sequelize, DataTypes) {
  var Post = sequelize.define("Post", {
    sequence: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    exercise: {
      type: DataTypes.STRING,
      allowNull: false,
      len: [1]
    },
    sets: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    weight: {
      type: DataTypes.STRING,
      allowNull: false,
      len: [1]
    },
    reps: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    tempo: {
      type: DataTypes.STRING,
      allowNull: false,
      len: [1]
    },
    rest: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    }
  });

  Post.associate = function(models) {
    // We're saying that a Post should belong to an workout
    // A Post can't be created without an workout due to the foreign key constraint
    Post.belongsTo(models.workout, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Post;
};
