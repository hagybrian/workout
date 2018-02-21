module.exports = function(sequelize, DataTypes) {
  var Exercisedata = sequelize.define("exercise_data", {
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

  Exercisedata.associate = function(models) {
    // We're saying that a Post should belong to an workout
    // A Post can't be created without an workout due to the foreign key constraint
    Exercisedata.belongsTo(models.workout, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Exercisedata;
};
