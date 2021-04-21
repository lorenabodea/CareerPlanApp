﻿// <auto-generated />
using System;
using API.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace API.Data.Migrations
{
    [DbContext(typeof(DataContext))]
    [Migration("20210419143441_Removed_Goal_and_task_properties")]
    partial class Removed_Goal_and_task_properties
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "5.0.1");

            modelBuilder.Entity("API.Entities.AppUser", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("UserName")
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("API.Entities.CareerPlan", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.HasKey("Id");

                    b.ToTable("CareerPlans");
                });

            modelBuilder.Entity("API.Entities.Goal", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<int?>("CareerPlanId")
                        .HasColumnType("INTEGER");

                    b.Property<string>("Title")
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.HasIndex("CareerPlanId");

                    b.ToTable("Goals");
                });

            modelBuilder.Entity("API.Entities.Task", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("Description")
                        .HasColumnType("TEXT");

                    b.Property<bool>("Done")
                        .HasColumnType("INTEGER");

                    b.Property<string>("Duedate")
                        .HasColumnType("TEXT");

                    b.Property<int>("Effort")
                        .HasColumnType("INTEGER");

                    b.Property<int>("GoalId")
                        .HasColumnType("INTEGER");

                    b.Property<int>("ReccuringType")
                        .HasColumnType("INTEGER");

                    b.HasKey("Id");

                    b.HasIndex("GoalId");

                    b.ToTable("Tasks");
                });

            modelBuilder.Entity("API.Entities.Goal", b =>
                {
                    b.HasOne("API.Entities.CareerPlan", null)
                        .WithMany("Goals")
                        .HasForeignKey("CareerPlanId");
                });

            modelBuilder.Entity("API.Entities.Task", b =>
                {
                    b.HasOne("API.Entities.Goal", null)
                        .WithMany("Tasks")
                        .HasForeignKey("GoalId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("API.Entities.CareerPlan", b =>
                {
                    b.Navigation("Goals");
                });

            modelBuilder.Entity("API.Entities.Goal", b =>
                {
                    b.Navigation("Tasks");
                });
#pragma warning restore 612, 618
        }
    }
}
