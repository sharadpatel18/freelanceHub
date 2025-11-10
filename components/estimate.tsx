"use client";
import React, { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function FreelanceEstimationForm() {
    const [open, setOpen] = useState(false);
    const [formData, setFormData] = useState({
        projectName: "",
        clientName: "",
        email: "",
        category: "",
        description: "",
        minAmount: 500,
        maxAmount: 5000,
        duration: "",
        milestones: [{ title: "", amount: "", timeline: "" }],
        proposal: "",
        attachments: [],
        validUntil: "",
        terms: "",
        deadline: "",
    });

    const [submissions, setSubmissions] = useState<any[]>([]);

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleRangeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: parseInt(value),
        }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFormData((prev) => ({
                ...prev,
                attachments: Array.from(e.target.files),
            }));
        }
    };

    // --- Milestone Handlers ---
    const handleMilestoneChange = (index: number, field: string, value: string) => {
        const updated = [...formData.milestones];
        updated[index][field] = value;
        setFormData((prev) => ({ ...prev, milestones: updated }));
    };

    const addMilestone = () => {
        setFormData((prev) => ({
            ...prev,
            milestones: [...prev.milestones, { title: "", amount: "", timeline: "" }],
        }));
    };

    const removeMilestone = (index: number) => {
        setFormData((prev) => ({
            ...prev,
            milestones: prev.milestones.filter((_, i) => i !== index),
        }));
    };

    const handleSubmit = () => {
        const required = [
            "projectName",
            "clientName",
            "email",
            "category",
            "description",
            "duration",
            "deadline",
        ];
        for (const field of required) {
            if (!formData[field]) {
                alert("Please fill in all required fields.");
                return;
            }
        }

        setSubmissions((prev) => [...prev, { ...formData, id: Date.now() }]);

        // Reset
        setFormData({
            projectName: "",
            clientName: "",
            email: "",
            category: "",
            description: "",
            minAmount: 500,
            maxAmount: 5000,
            duration: "",
            milestones: [{ title: "", amount: "", timeline: "" }],
            proposal: "",
            attachments: [],
            validUntil: "",
            terms: "",
            deadline: "",
        });
        setOpen(false);
    };

    return (
        <div className="max-w-6xl mx-auto">
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    <Button className="w-full">+ Create New Estimation</Button>
                </DialogTrigger>

                <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle className="text-2xl font-bold">
                            Project Estimation Form
                        </DialogTitle>
                        <DialogDescription>
                            Fill in the details for your project estimation. All * fields are required.
                        </DialogDescription>
                    </DialogHeader>

                    <div className="space-y-6 mt-4">
                        {/* Basic Fields */}
                        <div>
                            <Label className="mb-2" className="mb-2">Project Name *</Label>
                            <Input
                                name="projectName"
                                value={formData.projectName}
                                onChange={handleInputChange}
                                placeholder="e.g., E-commerce Website Redesign"
                            />
                        </div>

                        <div>
                            <Label className="mb-2">Client Name *</Label>
                            <Input
                                name="clientName"
                                value={formData.clientName}
                                onChange={handleInputChange}
                                placeholder="Enter client name"
                            />
                        </div>

                        <div>
                            <Label className="mb-2">Email Address *</Label>
                            <Input
                                name="email"
                                type="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                placeholder="client@example.com"
                            />
                        </div>

                        <div>
                            <Label className="mb-2">Project Category *</Label>
                            <Input
                                name="category"
                                value={formData.category}
                                onChange={handleInputChange}
                                placeholder="e.g., Web Development, Design"
                            />
                        </div>

                        <div>
                            <Label className="mb-2">Project Description *</Label>
                            <Textarea
                                name="description"
                                value={formData.description}
                                onChange={handleInputChange}
                                placeholder="Describe project scope and requirements..."
                            />
                        </div>

                        {/* Amount Range */}
                        <div className="space-y-4 p-4 rounded-lg border">
                            <Label className="mb-2">Project Amount Range *</Label>

                            <div>
                                <div className="flex justify-between">
                                    <Label className="mb-2">Minimum Amount</Label>
                                    <span className="font-bold">${formData.minAmount}</span>
                                </div>
                                <input
                                    type="range"
                                    name="minAmount"
                                    min="0"
                                    max="10000"
                                    step="100"
                                    value={formData.minAmount}
                                    onChange={handleRangeChange}
                                    className="w-full accent-indigo-600"
                                />
                            </div>

                            <div>
                                <div className="flex justify-between">
                                    <Label className="mb-2">Maximum Amount</Label>
                                    <span className="font-bold">${formData.maxAmount}</span>
                                </div>
                                <input
                                    type="range"
                                    name="maxAmount"
                                    min="0"
                                    max="10000"
                                    step="100"
                                    value={formData.maxAmount}
                                    onChange={handleRangeChange}
                                    className="w-full accent-indigo-600"
                                />
                            </div>

                            <p className="text-center font-medium">
                                Estimated Range: ${formData.minAmount} - ${formData.maxAmount}
                            </p>
                        </div>

                        {/* Estimated Duration */}
                        <div>
                            <Label className="mb-2">Estimated Duration *</Label>
                            <Input
                                name="duration"
                                value={formData.duration}
                                onChange={handleInputChange}
                                placeholder="e.g., 10 days, 3 weeks"
                            />
                        </div>

                        {/* Deadline */}
                        <div>
                            <Label className="mb-2">Project Deadline *</Label>
                            <Input
                                name="deadline"
                                type="date"
                                value={formData.deadline}
                                onChange={handleInputChange}
                            />
                        </div>

                        {/* Milestones */}
                        <div className="space-y-3 border rounded-lg p-4">
                            <div className="flex justify-between items-center">
                                <Label className="mb-2">Milestones (Optional)</Label>
                                <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={addMilestone}
                                >
                                    + Add Milestone
                                </Button>
                            </div>
                            {formData.milestones.map((milestone, index) => (
                                <div
                                    key={milestone.title}
                                    className="grid grid-cols-3 gap-2 items-center"
                                >
                                    <Input
                                        placeholder="Milestone title"
                                        value={milestone.title}
                                        onChange={(e) =>
                                            handleMilestoneChange(index, "title", e.target.value)
                                        }
                                    />
                                    <Input
                                        placeholder="Amount"
                                        value={milestone.amount}
                                        onChange={(e) =>
                                            handleMilestoneChange(index, "amount", e.target.value)
                                        }
                                    />
                                    <div className="flex items-center gap-2">
                                        <Input
                                            placeholder="Timeline"
                                            value={milestone.timeline}
                                            onChange={(e) =>
                                                handleMilestoneChange(index, "timeline", e.target.value)
                                            }
                                        />
                                        {formData.milestones.length > 1 && (
                                            <Button
                                                variant="destructive"
                                                size="icon"
                                                onClick={() => removeMilestone(index)}
                                            >
                                                ✕
                                            </Button>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Proposal */}
                        <div>
                            <Label className="mb-2">Proposal Message *</Label>
                            <Textarea
                                name="proposal"
                                value={formData.proposal}
                                onChange={handleInputChange}
                                placeholder="Describe your approach, experience, and why you’re a good fit..."
                            />
                        </div>

                        {/* Attachments */}
                        <div>
                            <Label className="mb-2">Attachments (Optional)</Label>
                            <Input
                                type="file"
                                multiple
                                onChange={handleFileChange}
                            />
                            {formData.attachments.length > 0 && (
                                <p className="text-sm mt-1 text-gray-600">
                                    {formData.attachments.length} file(s) selected
                                </p>
                            )}
                        </div>

                        {/* Validity */}
                        <div>
                            <Label className="mb-2">Estimate Valid Until (Optional)</Label>
                            <Input
                                name="validUntil"
                                type="date"
                                value={formData.validUntil}
                                onChange={handleInputChange}
                            />
                        </div>

                        {/* Terms */}
                        <div>
                            <Label className="mb-2">Additional Terms (Optional)</Label>
                            <Textarea
                                name="terms"
                                value={formData.terms}
                                onChange={handleInputChange}
                                placeholder="E.g., 50% upfront payment, balance on delivery."
                            />
                        </div>

                        {/* Submit Buttons */}
                        <div className="flex gap-3 pt-4">
                            <Button
                                onClick={() => setOpen(false)}
                                variant="outline"
                                className="flex-1"
                            >
                                Cancel
                            </Button>
                            <Button onClick={handleSubmit} className="flex-1">
                                Submit Estimation
                            </Button>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>

            {/* Submitted Estimations */}
            {submissions.length > 0 && (
                <div className="bg-white rounded-lg shadow-lg p-6 mt-6">
                    <h2 className="text-2xl font-bold mb-4">Submitted Estimations</h2>
                    <div className="grid gap-4">
                        {submissions.map((sub) => (
                            <div
                                key={sub.id}
                                className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition"
                            >
                                <h3 className="text-xl font-semibold">{sub.projectName}</h3>
                                <p>
                                    <strong>Client:</strong> {sub.clientName}
                                </p>
                                <p>
                                    <strong>Email:</strong> {sub.email}
                                </p>
                                <p>
                                    <strong>Category:</strong> {sub.category}
                                </p>
                                <p>
                                    <strong>Duration:</strong> {sub.duration}
                                </p>
                                <p>
                                    <strong>Deadline:</strong> {sub.deadline}
                                </p>
                                <p>
                                    <strong>Proposal:</strong> {sub.proposal}
                                </p>
                                <p>
                                    <strong>Estimate:</strong> ${sub.minAmount} - ${sub.maxAmount}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
